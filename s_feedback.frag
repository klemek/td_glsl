void main()
{
	vec2 uv0 = vUV.st;
    vec2 uv1 = (uv0 - .5) * vec2(iResolution.x / iResolution.y, 1);

    float zoom = magic(iF2, iB2, 857, 4);
    float x_shift = magic(iF3, iB3, 531, 4);
    float y_shift = magic(iF4, iB4, 953, 4);

    uv1 = mix(uv1 * (1 + zoom), uv1 * (zoom), step(0.5, zoom));

    uv1 += vec2(x_shift, y_shift);

    vec3 c = frame(uv1, 0);

    fragColor = TDOutputSwizzle(vec4(c, 1.));
}