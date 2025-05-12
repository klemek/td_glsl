void main()
{
    // start

	vec2 uv0 = vUV.st;
    float ratio = iResolution.x / iResolution.y;
    vec2 uv1 = (uv0 - .5) * vec2(ratio, 1);
    
    // controls

    float pixel_size = magic(iF6, iB6, 264, 4);
    bool pixel_size_trigger = magic_trigger(iB6, 264);

    float quantize = magic(iF7, iB7, 847);
    bool quantize_trigger = magic_trigger(iB7, 847);

    float blur = magic(iF8, iB8, 487);

    // logic

    vec2 uv2 = uv1;

    float k1 = pow(2, 10 - floor(pixel_size * 5));

    float pixel = (1 - pixel_size) * 250 + 25;

    if (pixel_size_trigger) {
        uv2 = floor(uv2 * k1) / k1;
    }

    
    vec3 c = gauss2(0, uv2 * vec2(iResolution.y / iResolution.x, 1)  + .5, 0.005 * blur);

    float k3 = pow(2, 5 - floor(quantize * 5));

    if (quantize_trigger) {
        c *= k3;

        c = vec3(
            mix(floor(c.x), ceil(c.x), dither(uv2 * k1, c.x - floor(c.x))),
            mix(floor(c.y), ceil(c.y), dither(uv2 * k1, c.y - floor(c.y))),
            mix(floor(c.z), ceil(c.z), dither(uv2 * k1, c.z - floor(c.z)))
        );

        c /= k3;
    }

    // output

    float fx = magic(iF5, vec3(1, 1, 0), 0, 4);
    c = mix(frame(uv1, 0), c, fx);

    fragColor = TDOutputSwizzle(vec4(c, 1.));
}