void main()
{
	vec2 uv0 = vUV.st;
    vec2 uv1 = (uv0 - .5) * vec2(iResolution.x / iResolution.y, 1);
    vec2 uv2 = uv1;

    float pixel = (1 - magic(iF6, iB6, 541)) * 250 + 25;

    uv2 = round(uv2 * pixel) / pixel;

    vec3 c = gauss2(0, uv2 * vec2(iResolution.y / iResolution.x, 1)  + .5, 0.005 * magic(iF8, iB8, 541));

    float colors = (1 - magic(iF7, iB7, 342)) * 10 + 1;

    if (colors <= 10) {
        c = round(c * colors) / colors;
    }

    // c = mix(c, 1 - c, step(noise_f(uv0 * 10 + vec2(iTime * 0.1, 0), 5), 0.5));

    float fx = magic(iF5, vec3(1, 1, 0), 0, 4);
    c = mix(frame(uv1, 0), c, fx);

    fragColor = TDOutputSwizzle(vec4(c, 1.));
}