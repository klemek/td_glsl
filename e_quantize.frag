void main()
{
	vec2 uv0 = vUV.st;
    vec2 uv1 = (uv0 - .5) * vec2(iResolution.x / iResolution.y, 1);

    float pixel = (1 - magic(iF5, iB5, 541)) * 250 + 25;

    uv1 = round(uv1 * pixel) / pixel;

    float feedback = magic(iF8, iB8, 958) * mix(1.0, 0.9, iB8.z);

    vec3 c = mix(gauss2(0, uv1 * vec2(iResolution.y / iResolution.x, 1)  + .5, 0.005 * magic(iF7, iB7, 541)), texture(sTD2DInputs[1], uv0).xyz, feedback);

    float colors = (1 - magic(iF6, iB6, 342)) * 10 + 1;

    if (colors <= 10) {
        c = round(c * colors) / colors;
    }

    // c = mix(c, 1 - c, step(noise_f(uv0 * 10 + vec2(iTime * 0.1, 0), 5), 0.5));

    fragColor = TDOutputSwizzle(vec4(c, 1.));
}