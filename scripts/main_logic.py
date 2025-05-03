# me - this DAT
# 
# channel - the Channel object which has changed
# sampleIndex - the index of the changed sample
# val - the numeric value of the changed sample
# prev - the previous sample value
# 
# Make sure the corresponding toggle is enabled in the CHOP Execute DAT.

SRC = 'midiinmap1'
SRC_ALL = 'midi'
DST = 'table1'
DST_BTN = 'table2'
DST_SLD = 'table3'
MODE = 'b33'
PAGE = 'b29'

MAPPING = ['b27', 'b28', 'b26', 'b25']

def onOffToOn(channel, sampleIndex, val, prev):
    if channel.name in MAPPING:
        trig(DST, int(op(SRC_ALL)[MODE]) * 2 + int(op(SRC_ALL)[PAGE]), MAPPING.index(channel.name))
    elif channel.name.startswith('b'):
        row_index = int(channel.name[1:]) - 1
        trig(DST_BTN, row_index, 1)
    return

# def whileOn(channel, sampleIndex, val, prev):
# 	return

# def onOnToOff(channel, sampleIndex, val, prev):
# 	return

# def whileOff(channel, sampleIndex, val, prev):
# 	return

def trig(dst, row, col):
    op(dst)[row, col].val = '1' if op(dst)[row, col].val == '0' else '0'

def onValueChange(channel, sampleIndex, val, prev):
    if channel.name.startswith('s'):
        row_index = int(channel.name[1:]) - 1
        op(DST_SLD)[row_index, 1] = val
    return
    