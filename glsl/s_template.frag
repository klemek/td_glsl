void main()
{
	// start

	vec2 uv0 = vUV.st;
    float ratio = iResolution.x / iResolution.y;
    vec2 uv1 = (uv0 - .5) * vec2(ratio, 1);

    // controls

    float v2 = magic(iF2, iB2, 222);

    float v3 = magic(iF3, iB3, 333);

    float v4 = magic(iF4, iB4, 444);

    // logic

    vec2 uv2 = uv1;

    float f = 1;

    // output

    fragColor = TDOutputSwizzle(vec4(f, f, f,1.));
}