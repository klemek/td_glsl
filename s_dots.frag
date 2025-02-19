void main()
{
	vec2 uv0 = vUV.st;

    vec2 uv1 = (uv0 - .5) * vec2(iResolution.x / iResolution.y, 1);

    vec2 uv = uv1;

    float k1 = magic(iF3, iB3, 857) * 5;

    uv = lens(uv, -k1, k1);

    uv = kal(uv, 5);

    uv *= rot(magic(iF2, iB2, 647) + 0.1 * iTime);

    float k = magic(iF1, iB1, 918) * 0.1 + 0.05;

    uv = cmod(uv, k * 2);

    float f = step(length(uv), k / (1 + length(uv1) * 2));

    vec3 c = f * mix(vec3(1), col(magic(iF4, iB4, 859)), iB4.x);

    fragColor = TDOutputSwizzle(vec4(c, 1.));
}