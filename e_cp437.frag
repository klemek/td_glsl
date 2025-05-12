void main()
{
    // start

	vec2 uv0 = vUV.st;
    float ratio = iResolution.x / iResolution.y;
    vec2 uv1 = (uv0 - .5) * vec2(ratio, 1);

    // controls

    float zoom = magic(iF6, iB6, 957, 4);

    vec2 charset = magic_f(iF7, iB7, 415);
    vec3 charset_ctrl = magic_b(iB7, 415);

    float char_delta = magic(iF8, iB8, 240, 4);

    // logic

    vec2 uv2 = uv1;

    float k1 = 100 * (1 - zoom) + 10;

    float t = magic(iF7, iB7, 023);
        
    float inv_k = 1 / k1;
    uv2 = floor(uv2 * k1) * inv_k;

    int start_char = charset_ctrl.x > 0 ? charsets[int(charset.x * CHARSETS) * 2] : 0x01;
    int char_span = int((charset_ctrl.x > 0 ? charsets[int(charset.x * CHARSETS) * 2 + 1] : 255));

    char_span = int(char_span * max(1 - charset.y, 1 / (char_span * 0.75)));
    
    ivec2 uv2i = ivec2(uv2 * k1);

    int code = ((charset_ctrl.y < 1 || (uv2i.x % 2 ^ uv2i.y % 2) > 0) ? 1 : 0) * (start_char + int((rand(uv2i) + char_delta) * char_span) % char_span);

    vec3 c = frame(uv2 + vec2(0, 0) * inv_k * 0.125, 0) * 0.2
        + frame(uv2 + vec2(1, 0) * inv_k * 0.125, 0) * 0.2
        + frame(uv2 + vec2(1, 1) * inv_k * 0.125, 0) * 0.2
        + frame(uv2 + vec2(0, 1) * inv_k * 0.125, 0) * 0.2
        + frame(uv2 + vec2(0.5, 0.5) * inv_k * 0.125, 0) * 0.2;
    
    c = char(mod(uv1 * k1, 1), code) ? c : vec3(0);

    // output

    float fx = magic(iF5, vec3(1, 1, 0), 0, 4);
    c = mix(frame(uv1, 0), c, fx);

    fragColor = TDOutputSwizzle(vec4(c, 1.));
}