void main()
{
	vec2 uv0 = vUV.st;
    vec2 uv1 = (uv0 - .5) * vec2(iResolution.x / iResolution.y, 1);
    vec2 uv2 = uv1;

    float k1 = magic(iF6, iB6, 847) * 0.5;

    uv2 *= 1 + magic(iF8, iB8, 424) * 2;

    uv2 = lens(uv2, -k1, k1);

    float k = magic(iF7, iB7, 938);

    vec3 c = vec3(
        frame(uv2 + vec2((rand(uv0.y * 1000 + iTime) - 0.5) * k * 0.1, 0), 0).x,
        frame(uv2 + vec2((rand(uv0.y * 1100 + iTime) - 0.5) * k * 0.1, 0), 0).y,
        frame(uv2, 0).z
    );

    float fx = magic(iF5, vec3(1, 1, 0), 0, 4);
    c = mix(frame(uv1, 0), c, fx);

    fragColor = TDOutputSwizzle(vec4(c, 1.));
}