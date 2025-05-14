from PIL import Image
import os

SUB_BLOCKS = 2
SUB_SIZE = 4

im = Image.open(os.path.join(os.path.dirname(__file__), "cp437.png"))

size, _ = im.size
blocks = size // (SUB_SIZE * SUB_BLOCKS)

pixels = im.convert("L").load()

with open(os.path.join(os.path.dirname(__file__), "cp437.c"), mode='w') as output:
    output.write("const int cp437[] = {\n")
    for y in range(blocks):
        for x in range(blocks):
            i0 = y * blocks + x
            line = ""
            for by in range(SUB_BLOCKS):
                for bx in range(SUB_BLOCKS):
                    i1 = by * SUB_BLOCKS + bx
                    di = i0 * SUB_BLOCKS + i1
                    d = 0
                    for dy in range(SUB_SIZE):
                        for dx in range(SUB_SIZE):
                            i2 = dy * SUB_SIZE + dx
                            px, py = (x * SUB_BLOCKS + bx) * SUB_SIZE + dx, (y * SUB_BLOCKS + by) * SUB_SIZE + dy
                            v = pixels[px, py] // 255
                            d |= v * pow(2, i2)
                    code = f"{d:04x}".upper()
                    line += f"0x{code}, "
            code = f"{i0:02x}".upper()
            output.write(f"    {line}// 0x{code}\n")
    output.write("};\n")