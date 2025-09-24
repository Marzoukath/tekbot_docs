#  3rd Test

## Objective

The advanced level Test 3 consists of modeling a complex part that will be validated by achieving the appropriate mass. 

**Material specifications:**
- **Material:** 1060 Alloy Aluminum
- **Density:** 2700 Kg/m³

![](/img/mec1.png)

<br />

## Summary

This part was mainly created using the following features:
- Extruded boss
- Extruded cut

### Mass Table

| Configuration | Mass (g) |
|---------------|----------|
| (a) A = 193 mm; B = 88 mm; W = B/2 mm; X = A/4 mm; Y = B+5.5 mm; Z = B+15mm  | 1400.64         |
| (b) A = 205 mm; B = 100mm; W = B/2 mm; X = A/4 mm; Y =B+5.5 mm; Z = B+15 mm  | 1651.39         |
| (c) A = 210 mm; B = 105 mm; W = B/2 mm; X = A/4 mm; Y = B+5.5 mm; Z = B+15mm | 1760.41         |

### Video

<center>
<iframe
  src="https://www.veed.io/view/c4bd4774-98e7-4d6f-8e45-d24cebbe843a?panel=share"
  width="800"
  height="600"
  frameborder="0"
  allowfullscreen>
</iframe>
</center>

<br />

### Files available for download

Download the modeling files by clicking by following these links :

- Case 1 : [SolidWorks File - case1](https://github.com/TekBot-Robotics-Challenge/2025-Team-The_Winners-Docs/blob/main/Tekbot_The_Winners/mechanic/test3/TEST3_Cas_1.SLDPRT)

- Case 2 : [SolidWorks File - case2](https://github.com/TekBot-Robotics-Challenge/2025-Team-The_Winners-Docs/blob/main/Tekbot_The_Winners/mechanic/test3/TEST3_Cas_2.SLDPRT)

- Case 2 : [SolidWorks File - case3](https://github.com/TekBot-Robotics-Challenge/2025-Team-The_Winners-Docs/blob/main/Tekbot_The_Winners/mechanic/test3/TEST3_Cas_3.SLDPRT)

<br />

## Part Creation Process

#### Step 1: Initial Sketch
On the front plane, draw the following view while respecting the dimensions and angles.

![](/img/mec2.png)

#### Step 2: Base Extrusion
Use the extruded boss feature and extrude the selected region by **96.5 mm** using the mid-plane option.

![](/img/mec4.png)

#### Step 3: Trapezoid Shape
On the top plane, make the following sketch with a **6 mm offset** to get the trapezoid shape.

![](/img/mec5.png)

#### Step 4: Through Extrusion
Make a **through all** extruded boss.

![](/img/mec6.png)

#### Step 5: Material Removal Series
Proceed with a series of extruded cuts.

#### Step 6: First Cut
Make a **through all** extruded cut from the sketch.

![](/img/mec7.png)

#### Step 7: Bilateral Cuts
Using the first initial sketch, make an extruded cut on both sides of the region, leaving a **5 mm gap** between them. Each cut is made with a **2.5 mm offset**.

![](/img/mec8.png)

#### Step 8: Intermediate Result
After this operation, we obtain an intermediate part form.

![](/img/mec9.png)

#### Step 9: Additional Material Removal
Continue with material removals for the region of sketch 1 (the first sketch).

![](/img/mec10.png)

#### Step 10: Mid-plane Boss
Still using the first sketch, create a **5 mm extruded boss** with the mid-plane option.

![](/img/mec11.png)

#### Step 11: Final Features
By making an extruded boss from the sketch on the top plane and extruded cuts for the **10 mm holes**, we obtain the penultimate part.

![](/img/mec12.png)

#### Step 12: Final Part
Apply the material and the desired display mode. This gives us the final Test 3 part.

![](/img/mec13.png)

## Variable Dimension System

#### Step 13: Global Variables Setup
For this test, dimensions **A, B, Z, Y, X, W** must be modified to obtain a new part with a different mass each time. To achieve this:

1. Use the equation tool
2. Add global variables
3. Each time we modify these global variables, the dimensions are adjusted automatically
4. This generates a new part configuration

![](/img/mec14.png)

#### Step 14: Variable Linking Methods
When dimensioning to use variables:

**Method 1:** Use **"="** which allows selection of the variable in question

**Method 2:** Link the dimension already placed on the drawing to the global variable already created

#### Step 15: Multiple Configurations
At the end of this series of variable modification operations, we obtain **3 different pieces** of different masses. The masses of the pieces are designated as configurations a, b, and c.

<br />

**(a) A = 193 mm; B = 88 mm; W = B/2 mm; X = A/4 mm; Y = B+5.5 mm; Z = B+15mm;**

![](/img/equation_Cas_1.png)

![](/img/Masse1.png)

**The part mass is : 1400.64 gramms**

<br />

**(b) A = 205 mm; B = 100mm; W = B/2 mm; X = A/4 mm; Y =B+5.5 mm; Z = B+15 mm;**

![](/img/equation_Cas_2.png)

![](/img/Masse_Cas_2.png)

**The part mass is : 1651.39 gramms**

<br />

**(c) A = 210 mm; B = 105 mm; W = B/2 mm; X = A/4 mm; Y = B+5.5 mm; Z = B+15mm;**

![](/img/equation_Cas_3.png)

![](/img/Masse_Cas_3.png)

**The part mass is : 1760.41 gramms**

<br />

## Alternative Perspectives

Multiple paths allow for creating the same part. The part in this test can also be created using the following alternative method:

### Alternative Method A
On the top plane, create the following sketch and make an extruded boss of **"B" mm**.

### Alternative Method B
On the front plane, make the following sketch and proceed to remove extruded material to obtain the part.

### Alternative Method C
Use global variables or dimension directly on the sketches to have the three requested parts with the desired dimension specifications.

---

*Note: This document references multiple technical drawings and sketches that guide the 3D modeling process. The parametric approach using global variables allows for efficient generation of multiple part variants.*


## Bonus

The part mass is **7854,78 gramms**

<center>
<iframe
  src="https://www.veed.io/view/eccdf806-b2c6-4939-9b4d-e86c95a49eb8?panel=share"
  width="800"
  height="600"
  frameborder="0"
  allowfullscreen>
</iframe>
</center>

<br />

| ![Img1](/img/t3_1.jpg) | ![Img2](/img/t3_2.png) | ![Img3](/img/t3_3.png) |
|--------------------------|--------------------------|--------------------------|
| ![Img1](/img/t3_4.png) | ![Img2](/img/t3_5.png) | ![Img3](/img/t3_6.png) |
| ![Img1](/img/t3_7.png) | ![Img2](/img/t3_8.png) | ![Img3](/img/t3_9.png) |
| ![Img1](/img/t3_10.png) | ![Img2](/img/t3_11.png) | ![Img3](/img/t3_12.png) |
| ![Img1](/img/t3_13.png) | ![Img2](/img/t3_14.png) | ![Img3](/img/t3_15.png) |
| ![Img1](/img/t3_16.png) | ![Img2](/img/t3_17.png) | ![Img3](/img/t3_18.png) |
| ![Img1](/img/t3_17.png) | ![Img2](/img/t3_20.png) | ![Img3](/img/t3_21.png) |
| ![Img1](/img/t3_22.png) | ![Img2](/img/t3_23.png) | ![Img3](/img/t3_24.png) |