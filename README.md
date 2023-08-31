# qCalc

a simple calculator for those who use quaternions often

## The interface

 - An identity quaternion is stored in memory, shown in purple at the top of the screen.
 - Using a keyboard or the provided common quantities, enter the X, Y, Z, and W components of a new quaternion.
 - Pressing the equals (=) key will (right-)multiply the quaternion in memory by the quaternion just entered.

   > In other words: *qMem*<sub>new</sub> = *qMem* * *qEntry*

 - The invert button inverts the current quaternion in memory. 

## Keyboard shortcuts

The top-left section of the keyboard is visually mapped to the calculator keys:

```
|------------|------------|------------|------------|
|   U = 1    |  I = 0.7   |  O = 0.5   |   P = 0    |
|------------|------------|------------|------------|
  |------------|------------|------------|------------|
  |   J = -1   |  K = -0.7  |  L = -0.5  |   ; = 0    |
  |------------|------------|------------|------------| 
```

Other shortcuts:

|Key         |Operation                                                                     |
|------------|------------------------------------------------------------------------------|
|`x` or `*`  | Multiply (equivalent to `=` button). NOTE: `*` may not work on some systems. |
|`c`         | Clear (equivalent to repeatedly pressing backspace)                          |
|`v`         | Invert (equivalent to `inv` button)                                          |
|`b`         | Backspace (equivalent to backspace button)                                   |
|`n` or `m`  | Clear memory (equivalent to `MC` button)                                     |