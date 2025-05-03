void main()
{
	vec2 uv0 = vUV.st;
    float ratio = iResolution.x / iResolution.y;
    vec2 uv1 = (uv0 - .5) * vec2(ratio, 1);
    vec2 uv2 = uv1;
    
    uv2 = mix(uv1, kal2(uv2 * rot(0.25), floor(magic(iF6, iB6, 238) * 9 + 1)) * vec2(1, -2) + vec2(0, -0.5), iB6.x);    

    uv2 *= rot(magic(iF7, iB7, 271, 4));

    uv2.x = (saw(uv2.x / ratio + 0.5 + magic(iF8, iB8, 312, 4) * 2) - 0.5) * ratio;

    vec3 c = frame(uv2, 0);

    float fx = magic(iF5, vec3(1, 1, 0), 0, 4);
    c = mix(frame(uv1, 0), c, fx);

    fragColor = TDOutputSwizzle(vec4(c, 1.));
}