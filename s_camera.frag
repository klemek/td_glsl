void main()
{
	vec2 uv0 = vUV.st;
    vec2 uv1 = (uv0 - .5) * vec2(iResolution.x / iResolution.y, 1);

    float hue = magic(iF2, iB2, 124, 4);
    float saturation = magic(iF3, iB3, 531, 4);
    float light = magic(iF4, iB4, 953, 4);

    vec3 c = frame(uv1, 0);

    c = shift3(c, hue);

    c *= 1 + saturation;
    c = mix(c + light * 2.0, c - (1 - light) * 2.0, step(0.5, light));

    fragColor = TDOutputSwizzle(vec4(c, 1.));
}