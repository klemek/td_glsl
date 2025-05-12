void main()
{
    // start

	vec2 uv0 = vUV.st;
    float ratio = iResolution.x / iResolution.y;
    vec2 uv1 = (uv0 - .5) * vec2(ratio, 1);

    // controls

    float zoom = magic(iF2, iB2, 447);

    vec2 charset = magic_f(iF3, iB3, 965);
    vec3 charset_ctrl = magic_b(iB3, 965);

    float char_delta = magic(iF4, iB4, 216, 4);

    // logic

    vec2 uv2 = uv1;

    uv2 *= zoom * 20 + 3;

    uv2 += iTime * iTempo / 60;

    uv2 = mod(uv2, 100) + 100;

    int start_char = charset_ctrl.x > 0 ? charsets[int(charset.x * CHARSETS) * 2] : 0x01;
    int char_span = int((charset_ctrl.x > 0 ? charsets[int(charset.x * CHARSETS) * 2 + 1] : 255));

    char_span = int(char_span * max(1 - charset.y, 1 / (char_span * 0.75)));
    
    ivec2 uv2i = ivec2(uv2);

    int code = ((charset_ctrl.y < 1 || (uv2i.x % 2 ^ uv2i.y % 2) > 0) ? 1 : 0) * (start_char + int((rand(uv2i) + char_delta) * char_span) % char_span);

    uv2 = mod(uv2, 1);

    vec3 c = vec3(char(uv2, code) ? 1 : 0);

    // output

    fragColor = TDOutputSwizzle(vec4(c, 1.));
}