void main()
{
	// start

	vec2 uv0 = vUV.st;
    float ratio = iResolution.x / iResolution.y;
    vec2 uv1 = (uv0 - .5) * vec2(ratio, 1);

    // controls

    float hue = magic(iF2, iB2, 760, 4);

    float saturation = magic(iF3, iB3, 160, 4);

    float light = magic(iF4, iB4, 869, 4);

    // logic

    vec3 c = frame(uv1, 0);

    c = shift3(c, hue);

    c *= 1 + saturation;
    c = mix(c + light * 2.0, c - (1 - light) * 2.0, step(0.5, light));

    // output

    fragColor = TDOutputSwizzle(vec4(c, 1.));
}