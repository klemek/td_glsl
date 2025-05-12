void main()
{
    // start

	vec2 uv0 = vUV.st;
    float ratio = iResolution.x / iResolution.y;
    vec2 uv1 = (uv0 - .5) * vec2(ratio, 1);

    // controls

    float zoom = magic(iF2, iB2, 344);

    float rotation = magic(iF3, iB3, 599);

    float lens_v = magic(iF4, iB4, 668);

    // logic

    vec2 uv2 = uv1;

    float k1 = lens_v * 5;

    uv2 = lens(uv2, -k1, k1);

    uv2 = kal(uv2, 5);

    uv2 *= rot(rotation + iTime * iTempo / 960);

    float k = zoom * 0.1 + 0.05;

    uv2 = cmod(uv2, k * 2);

    float f = step(length(uv2), k / (1 + length(uv1) * 2));

    // output

    fragColor = TDOutputSwizzle(vec4(f, f, f, 1.));
}