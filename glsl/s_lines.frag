void main()
{
	// start

	vec2 uv0 = vUV.st;
    float ratio = iResolution.x / iResolution.y;
    vec2 uv1 = (uv0 - .5) * vec2(ratio, 1);

    // controls

    float thickness = magic(iF2, iB2, 420);

    float rotation = magic(iF3, iB3, 494);

    float distort = magic(iF4, iB4, 178);

    // logic

    vec2 uv2 = uv1;

    uv2.y *= cos(uv2.x * 5 * distort);

    uv2 *= rot(rotation + iTime * iTempo / 960);

    float k = thickness * 2;

    uv2.y = cmod(uv2.y, k * 2 + 0.1);

    float f = step(uv2.y, k * 0.125 + 0.05) * step(-uv2.y, k * 0.125 + 0.01);

    // output

    fragColor = TDOutputSwizzle(vec4(f, f, f, 1.));
}