void main()
{
    // start

	vec2 uv0 = vUV.st;
    float ratio = iResolution.x / iResolution.y;
    vec2 uv1 = (uv0 - .5) * vec2(ratio, 1);
    
    // controls

    float lens_v1 = magic(iF6, iB6, 533);

    float lens_v2 = magic(iF7, iB7, 193);

    float zoom = magic(iF8, iB8, 280);

    // logic
    
    vec2 uv2 = uv1;

    uv2 *= 1 + zoom * 2;

    uv2 = lens(uv2, -lens_v2 * 10, lens_v1 * 10);

    float k = magic(iF7, iB7, 938);

    vec3 c = frame(uv2, 0);

    // output

    float fx = magic(iF5, vec3(1, 1, 0), 0, 4);
    c = mix(frame(uv1, 0), c, fx);

    fragColor = TDOutputSwizzle(vec4(c, 1.));
}