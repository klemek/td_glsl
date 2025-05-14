void main()
{
	// start

	vec2 uv0 = vUV.st;
    float ratio = iResolution.x / iResolution.y;
    vec2 uv1 = (uv0 - .5) * vec2(ratio, 1);

    // controls

    float zoom = magic(iF2, iB2, 931, 4);

    float x_shift = magic(iF3, iB3, 284, 4);
    
    float y_shift = magic(iF4, iB4, 709, 4);

    // logic

    vec2 uv2 = uv1;

    uv2 = mix(uv2 * (1 + zoom), uv2 * (zoom), step(0.5, zoom));

    uv2 += vec2(x_shift, y_shift);

    vec3 c = frame(uv2, 0);

    // output

    fragColor = TDOutputSwizzle(vec4(c, 1.));
}