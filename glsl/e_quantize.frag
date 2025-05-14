void main()
{
    // start

	vec2 uv0 = vUV.st;
    float ratio = iResolution.x / iResolution.y;
    vec2 uv1 = (uv0 - .5) * vec2(ratio, 1);

    // controls

    float pixel_size = magic(iF6, iB6, 889);

    float quantize = magic(iF7, iB7, 993);
    bool quantize_trigger = magic_trigger(iB7, 993);

    float blur = magic(iF8, iB8, 378);

    // logic

    vec2 uv2 = uv1;

    float pixel = (1 - pixel_size) * 250 + 25;

    uv2 = round(uv2 * pixel) / pixel;

    vec3 c = gauss2(0, uv2 * vec2(1 / ratio, 1)  + .5, 0.005 * blur);

    float colors = (1 - quantize) * 10 + 1;

    if (quantize_trigger) {
        c = round(c * colors) / colors;
    }

    // c = mix(c, 1 - c, step(noise_f(uv0 * 10 + vec2(iTime * 0.1, 0), 5), 0.5));

    // output

    float fx = magic(iF5, vec3(1, 1, 0), 0, 4);
    c = mix(frame(uv1, 0), c, fx);

    fragColor = TDOutputSwizzle(vec4(c, 1.));
}