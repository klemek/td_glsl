void main()
{
    // start

	vec2 uv0 = vUV.st;
    float ratio = iResolution.x / iResolution.y;
    vec2 uv1 = (uv0 - .5) * vec2(ratio, 1);

    // controls

    float spacing = magic(iF2, iB2, 103, 4);

    float thickness = magic(iF3, iB3, 154, 4);

    float scroll = magic_reverse(iF4, iB4, 535, 4);

    // logic

    vec2 uv2 = uv1;

    uv2.y += 0.5;

    uv2 *= 2.25;

    uv2 = vec2((uv2.x + 1) * 0.5, -uv2.y);

    float m1 = spacing * 4.5 + 0.5;

    float y = log(-uv2.y) * m1;

    y = mod(y + scroll * 5.0 - iTime * iTempo / 960, 5.);

    float id = floor(y) * 32;

    float s = cos(uv2.x * rand(id + 837) * 100 + rand(id + 281) * PI)
                + cos(uv2.x * rand(id + 231) * 100 + rand(id + 526) * PI)
                + cos(uv2.x * rand(id + 746) * 100 + rand(id + 621) * PI)
                + cos(uv2.x * rand(id + 235) * 100 + rand(id + 315) * PI)
                + cos(uv2.x * rand(id + 782) * 100 + rand(id + 314) * PI)
                + cos(uv2.x * rand(id + 241) * 100 + rand(id + 734) * PI)
                + cos(uv2.x * rand(id + 416) * 100 + rand(id + 425) * PI)
                + cos(uv2.x * rand(id + 315) * 100 + rand(id + 525) * PI)
                + cos(uv2.x * rand(id + 423) * 100 + rand(id + 743) * PI)
                + cos(uv2.x * rand(id + 637) * 100 + rand(id + 245) * PI);

    s *= 0.1;

    float cut =  0.025 + thickness * 0.475;
    
    float y2 = min(1.0, -(uv2.y));

    float f = (0.1 + 0.9 * (cos((y2 + 1.0) * PI) * 0.5 + 0.5)) * step(uv2.y, 0.) * step(fract(y + (s - 1) * (1 - cut) * 0.5), cut);//step(uv2.y, 0.) * mod(-uv2.y * 1.0, 1.0);

     // output

    fragColor = TDOutputSwizzle(vec4(f, f, f,1.));
}