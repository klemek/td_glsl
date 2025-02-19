void main()
{
	vec2 uv0 = vUV.st;
    vec2 uv1 = (uv0 - .5) * vec2(iResolution.x / iResolution.y, 1);

    float k0 = floor(magic(iF5, iB5, 947) * 5);
    float k1 = pow(2, 10 - k0);

    if (k0 > 0) {
        uv1 = floor(uv1 * k1) / k1;
    }

    vec3 c = frame(uv1, 0);

    float k2 = floor(magic(iF6, iB6, 124) * 5);
    float k3 = pow(2, 5 - k2);

    if (k2 > 0) {
        c *= k3;

        c = vec3(
            mix(floor(c.x), ceil(c.x), dither(uv1 * k1, c.x - floor(c.x))),
            mix(floor(c.y), ceil(c.y), dither(uv1 * k1, c.y - floor(c.y))),
            mix(floor(c.z), ceil(c.z), dither(uv1 * k1, c.z - floor(c.z)))
        );

        c /= k3;
    }

    float feedback = magic(iF8, iB8, 958) * 0.9;

    c = mix(c, texture(sTD2DInputs[1], uv0).xyz, feedback);

    fragColor = TDOutputSwizzle(vec4(c, 1.));
}