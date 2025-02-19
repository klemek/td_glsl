void main()
{
	vec2 uv0 = vUV.st;
    vec2 uv1 = (uv0 - .5) * vec2(iResolution.x / iResolution.y, 1);

    float k1 = magic(iF5, iB5, 847) * 0.5;

    uv1 *= 1 + magic(iF7, iB7, 424) * 2;

    uv1 = lens(uv1, -k1, k1);

    float k = magic(iF6, iB6, 938);

    vec3 c = vec3(
        frame(uv1 + vec2((rand(uv0.y * 1000 + iTime) - 0.5) * k * 0.1, 0), 0).x,
        frame(uv1 + vec2((rand(uv0.y * 1100 + iTime) - 0.5) * k * 0.1, 0), 0).y,
        frame(uv1, 0).z
    );

    float feedback = magic(iF8, iB8, 958) * 0.9;

    c = mix(c, texture(sTD2DInputs[1], uv0).xyz, feedback);

    fragColor = TDOutputSwizzle(vec4(c, 1.));
}