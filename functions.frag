uniform float iTime;
uniform int iTempo;
uniform vec2 iResolution;
uniform vec2 iF1;
uniform vec2 iF2;
uniform vec2 iF3;
uniform vec2 iF4;
uniform vec2 iF5;
uniform vec2 iF6;
uniform vec2 iF7;
uniform vec2 iF8;
uniform vec3 iB1;
uniform vec3 iB2;
uniform vec3 iB3;
uniform vec3 iB4;
uniform vec3 iB5;
uniform vec3 iB6;
uniform vec3 iB7;
uniform vec3 iB8;
uniform vec3 iB9;
out vec4 fragColor;

#define PI 3.1415927

// BASICS

float ease(float x) {
    return 0.5 - cos(max(min(x, 1.0), 0.0)*PI) * 0.5;
}

vec2 ease(vec2 x) {
    return 0.5 - cos(max(min(x, 1.0), 0.0)*PI) * 0.5;
}

vec3 ease(vec3 x) {
    return 0.5 - cos(max(min(x, 1.0), 0.0)*PI) * 0.5;
}

float saw(float x){
    return abs(mod(x+1,2)-1);
}

vec2 saw(vec2 x){
    return abs(mod(x+1,2)-1);
}

vec3 saw(vec3 x){
    return abs(mod(x+1,2)-1);
}

float cmod(float x, float k){
    return mod(x + k * 0.5, k) - k * 0.5;
}

vec2 cmod(vec2 x, float k){
    return mod(x + k * 0.5, k) - k * 0.5;
}

vec3 cmod(vec3 x, float k){
    return mod(x + k * 0.5, k) - k * 0.5;
}

// RANDOM

float rand(float seed){
    float v=pow(abs(seed),6./7.);
    v*=sin(v)+1.;
    return fract(v);
}

float rand(vec2 n){
    return rand(n.x * 1234 + n.y * 9876);
}

// COLORS

vec3 col(float x){
    return vec3(
        .5*(sin(x*2.*PI)+1.),
        .5*(sin(x*2.*PI+2.*PI/3.)+1.),
        .5*(sin(x*2.*PI-2.*PI/3.)+1.)
    );
}

vec3 shift(vec3 c, float f) {
    return vec3(
        c.x * (1 - f) + c.y * f,
        c.y * (1 - f) + c.z * f,
        c.z * (1 - f) + c.x * f
    );
}

vec3 shift3(vec3 c, float f) {
    return shift(shift(shift(c, f), f), f);
}

// TIME

float randTime(float seed){
    return rand(seed + mod(floor(iTime * iTempo / 240), 1000));
}

float divider(float k, int m)
{
    // 2 -> 0, 0.5, 1, 2 | 3 -> 0, 0.25, 0.5, 1, 2, 4
    return k * (m * 2 - 1) < 1 ? 0 : pow(2, floor(k * (m * 2 - 1)) - m);
}

float modTime(float k, int m, float k2)
{
    return k * (m * 2  - 1) < 1 ? 0 : mod(divider(k, m) * iTime * iTempo * k2 / 120, 1);
}

float modTime(float k, int m)
{
    return modTime(k, m, 1.0);
}

float modTime(float k)
{
    return modTime(k, 2);
}

float sinTime(float k, int m)
{
    return sin(modTime(k, m, 0.5) * 2 * PI);
}

float sinTime(float k)
{
    return sinTime(k, 2);
}

float cosTime(float k, int m)
{
    return cos(modTime(k, m, 0.5) * 2 * PI);
}

float cosTime(float k)
{
    return cosTime(k, 2);
}

// MAGIC

float magic(vec2 F, vec3 B, float i, int m)
{
    float random = mix(B.z, 0.0, iB9.y);
    float invert = mix(0, B.z, iB9.y);

    float v1 = mix(F.x, randTime(i + 1), random);
    float v2 = mix(F.y, randTime(i + 2), random);
    float b1 = mix(B.x, step(0.2, randTime(i + 3)), random);
    float b2 = mix(B.y, step(0.5, randTime(i + 4)), random);

    return mix(0, v1 * mix(mix(1 - modTime(v2, m), modTime(v2, m), invert), cosTime(v2, m) * 0.5 + 0.5, b2), b1);
}

float magic(vec2 F, vec3 B, float i)
{
    return magic(F, B, i, 2);
}

float magic(float i)
{
    return magic(vec2(0), vec3(0, 0, 1), i);
}

// EFFECTS

mat2 rot(float angle){
    return mat2(
        cos(angle*2.*PI),-sin(angle*2.*PI),
        sin(angle*2.*PI),cos(angle*2.*PI)
    );
}

vec2 lens(vec2 uv, float limit, float power) {
    return uv * (1 + limit + length(uv * power));
}

vec2 kal(vec2 uv, float n) {
    float t = atan(uv.y, uv.x) + PI * 0.5;
    float q = 3.0 / (2.0 * PI);
    t = abs(mod(t + PI / (n), 2 * PI / n) - PI / (n));
    return length(uv) * vec2(
        cos(t),
        sin(t)
    );
}

vec2 kal2(vec2 uv, float n) {
    float t = atan(uv.y, uv.x) + PI * 0.5;
    float t2 = abs(mod(t + PI / n, 2 * PI / n) - PI / n);
    return length(uv) * vec2(
        cos(t2),
        sin(t2)
    );
}

// NOISE

float noise(vec2 n)
{
    const vec2 d = vec2(0, 1);
    vec2 b = floor(n);
    vec2 f = fract(n);
    f *= f * (3 - 2 * f);
    return mix(mix(rand(b), rand(b + d.yx), f.x), mix(rand(b + d.xy), rand(b + d.yy), f.x), f.y);
}

float noise_f(vec2 n, int f)
{
    float o = noise(n) / 2;
    o += mix(o, noise(n * 2), f > 1 ? 1 : 0) / 4;
    o += mix(o, noise(n * 4), f > 2 ? 1 : 0) / 8;
    o += mix(o, noise(n * 8), f > 3 ? 1 : 0) / 16;
    o += mix(o, noise(n * 16), f > 4 ? 1 : 0) / 32;
    return o;
}

// VORONOI

float v_index(vec2 uv) {
    return floor(uv.x) + floor(uv.y) * 45;
}

vec2 v_pos(float i) {
    int iTimeId = int(iTime * iTempo / 60);
    float iTimeV = iTime * iTempo / 60 - iTimeId;

    float x0 = rand(i + 823 + iTimeId);
    float y0 = rand(i + 328 + iTimeId);
    
    float x1 = rand(i + 823 + iTimeId + 1);
    float y1 = rand(i + 328 + iTimeId + 1);
    
    return vec2(
        mix(x0, x1, ease(ease(iTimeV))),
        mix(y0, y1, ease(ease(iTimeV)))
    );
}

vec4 voronoi(vec2 uv, float dist) {
    vec4 o = vec4(0, 0, 2, 0);
    vec4 t = vec4(0, 0, 2, 0);
    float d, i;
    vec2 uv2, p;
    for (int dx = -1; dx <= 1; dx++) {
        for (int dy = -1; dy <= 1; dy++) {
            uv2 = vec2(floor(uv.x) + dx, floor(uv.y) + dy);
            i = v_index(uv2);
            p = uv2 + v_pos(i) * dist;
            d = length(p - uv);
            if (d < o.z) {
                t = o;
                o = vec4(p, d, i);
            } else if (d < t.z) {
                t = vec4(p, d, i);
            }
        }
    }
    return vec4(o.z, t.z, o.w, t.w);
}

// SHAPES

float stripe(float x, float k1, float k2)
{
    return k2 > k1 ? (1 - step(x, k1)) * (step(x, k2)) : ((1 - step(x, k2)) * (step(x, k1)));
}

float capsule(vec2 uv, float r, float d, float a)
{
    uv *= rot(a);
    float f1 = step(uv.x, r) * step(-uv.x, r) * step(uv.y, d - r) * step(-uv.y, d - r);
    float f2 = step(length(uv - vec2(0, d - r)), r);
    float f3 = step(length(uv + vec2(0, d - r)), r);
    return min(1, f1 + f2 + f3);
}

// OTHER

vec3 frame(vec2 uv, int k)
{
    uv = uv * vec2(iResolution.y / iResolution.x, 1)  + .5;
    uv = saw(uv);
    return texture(sTD2DInputs[k], uv).xyz;
}

vec3 gauss(int i, vec2 uv, float f)
{
    return texture(sTD2DInputs[i], uv + vec2(f, 0)).xyz * 0.125
        +  texture(sTD2DInputs[i], uv + vec2(f, f)).xyz * 0.125
        +  texture(sTD2DInputs[i], uv + vec2(0, f)).xyz * 0.125
        +  texture(sTD2DInputs[i], uv + vec2(-f, f)).xyz * 0.125
        +  texture(sTD2DInputs[i], uv + vec2(-f, 0)).xyz * 0.125
        +  texture(sTD2DInputs[i], uv + vec2(-f, -f)).xyz * 0.125
        +  texture(sTD2DInputs[i], uv + vec2(0, -f)).xyz * 0.125
        +  texture(sTD2DInputs[i], uv + vec2(f, -f)).xyz * 0.125;
}

vec3 gauss2(int i, vec2 uv, float f)
{
    return gauss(i, uv + vec2(f, 0), f).xyz * 0.125
        +  gauss(i, uv + vec2(f, f), f).xyz * 0.125
        +  gauss(i, uv + vec2(0, f), f).xyz * 0.125
        +  gauss(i, uv + vec2(-f, f), f).xyz * 0.125
        +  gauss(i, uv + vec2(-f, 0), f).xyz * 0.125
        +  gauss(i, uv + vec2(-f, -f), f).xyz * 0.125
        +  gauss(i, uv + vec2(0, -f), f).xyz * 0.125
        +  gauss(i, uv + vec2(f, -f), f).xyz * 0.125;
}

vec3 gauss3(int i, vec2 uv, float f)
{
    return gauss2(i, uv + vec2(f, 0), f).xyz * 0.125
        +  gauss2(i, uv + vec2(f, f), f).xyz * 0.125
        +  gauss2(i, uv + vec2(0, f), f).xyz * 0.125
        +  gauss2(i, uv + vec2(-f, f), f).xyz * 0.125
        +  gauss2(i, uv + vec2(-f, 0), f).xyz * 0.125
        +  gauss2(i, uv + vec2(-f, -f), f).xyz * 0.125
        +  gauss2(i, uv + vec2(0, -f), f).xyz * 0.125
        +  gauss2(i, uv + vec2(f, -f), f).xyz * 0.125;
}

vec3 gauss4(int i, vec2 uv, float f)
{
    return gauss3(i, uv + vec2(f, 0), f).xyz * 0.125
        +  gauss3(i, uv + vec2(f, f), f).xyz * 0.125
        +  gauss3(i, uv + vec2(0, f), f).xyz * 0.125
        +  gauss3(i, uv + vec2(-f, f), f).xyz * 0.125
        +  gauss3(i, uv + vec2(-f, 0), f).xyz * 0.125
        +  gauss3(i, uv + vec2(-f, -f), f).xyz * 0.125
        +  gauss3(i, uv + vec2(0, -f), f).xyz * 0.125
        +  gauss3(i, uv + vec2(f, -f), f).xyz * 0.125;
}

float dither(vec2 uv, float x)
{
    bool o = false;
    o = o || x * 16 >= 1 && floor(mod(uv.x, 4)) == 0 && floor(mod(uv.y, 4)) == 0;
    o = o || x * 16 >= 2 && floor(mod(uv.x, 4)) == 2 && floor(mod(uv.y, 4)) == 2;
    o = o || x * 16 >= 3 && floor(mod(uv.x, 4)) == 0 && floor(mod(uv.y, 4)) == 2;
    o = o || x * 16 >= 4 && floor(mod(uv.x, 4)) == 2 && floor(mod(uv.y, 4)) == 0;
    o = o || x * 16 >= 5 && floor(mod(uv.x, 4)) == 1 && floor(mod(uv.y, 4)) == 1;
    o = o || x * 16 >= 6 && floor(mod(uv.x, 4)) == 3 && floor(mod(uv.y, 4)) == 3;
    o = o || x * 16 >= 7 && floor(mod(uv.x, 4)) == 1 && floor(mod(uv.y, 4)) == 3;
    o = o || x * 16 >= 8 && floor(mod(uv.x, 4)) == 3 && floor(mod(uv.y, 4)) == 1;
    o = o || x * 16 >= 9 && floor(mod(uv.x, 4)) == 1 && floor(mod(uv.y, 4)) == 0;
    o = o || x * 16 >= 10 && floor(mod(uv.x, 4)) == 3 && floor(mod(uv.y, 4)) == 2;
    o = o || x * 16 >= 11 && floor(mod(uv.x, 4)) == 1 && floor(mod(uv.y, 4)) == 2;
    o = o || x * 16 >= 12 && floor(mod(uv.x, 4)) == 3 && floor(mod(uv.y, 4)) == 0;
    o = o || x * 16 >= 13 && floor(mod(uv.x, 4)) == 0 && floor(mod(uv.y, 4)) == 1;
    o = o || x * 16 >= 14 && floor(mod(uv.x, 4)) == 2 && floor(mod(uv.y, 4)) == 3;
    o = o || x * 16 >= 15 && floor(mod(uv.x, 4)) == 0 && floor(mod(uv.y, 4)) == 3;
    o = o || x * 16 >= 16 && floor(mod(uv.x, 4)) == 2 && floor(mod(uv.y, 4)) == 1;
    return o ? 1 : 0;
}