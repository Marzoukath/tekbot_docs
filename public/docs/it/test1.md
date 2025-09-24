# 1rst Test

## Object-Oriented Robot Management Documentation

<div style={{ textAlign: "center" }}>
  <a href="#bulb-about">About</a> &nbsp;&bull;&nbsp;
  <a href="#classical_building-architecture">Architecture</a> &nbsp;&bull;&nbsp;
  <a href="#mag_right-implementation">Implementation</a> &nbsp;&bull;&nbsp;
  <a href="#computer-running">Execution</a> &nbsp;&bull;&nbsp;
  <a href="#toolbox-tech-stack">Tech Stack</a>
</div>

<br />

Access the code files by clicking [here](https://github.com/TekBot-Robotics-Challenge/2025-Team-The_Winners-Docs/tree/main/Tekbot_The_Winners/computer_science/test1).

<div style={{ textAlign: "center" }}>

| Component       |                                                                                                              Status                                                                                                               |                                                                                                            Tests                                                                                                             | 
|---------------|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|
| Robot Base       |          [![Robot Base - Implemented](https://img.shields.io/badge/Robot%20Base-Implemented-green)](Code/robot.py)          |          [![Robot Base - Tests](https://img.shields.io/badge/Tests-Passing-green)](tests/)          |
| Actions | [![Actions - Implemented](https://img.shields.io/badge/Actions-Implemented-green)](Code/action.py) | [![Actions - Tests](https://img.shields.io/badge/Tests-Passing-green)](tests/) |
| Components      |        [![Components - Implemented](https://img.shields.io/badge/Components-Implemented-green)](Code/component.py)         |        [![Components - Tests](https://img.shields.io/badge/Tests-Passing-green)](tests/)         |
| Simulation         |             [![Simulation - Implemented](https://img.shields.io/badge/Simulation-Implemented-green)](Code/simulation.py)             |             [![Simulation - Tests](https://img.shields.io/badge/Tests-Passing-green)](tests/)             |

 :construction: <sub>Test 1 - Tekbot Robotics Challenges </sub>

</div>
 
## :bulb: About

The main objective of this **robotics test** is to demonstrate our skills in **object-oriented programming** through the design of a flexible and extensible robot management system. This project illustrates the application of fundamental OOP principles: **encapsulation**, **inheritance**, and **polymorphism**.

> Object-oriented programming allows for the creation of modular and maintainable systems.  
> -- Tekbot Robotics Team

**Flexibility** and **Extensibility** are ensured by a well-defined **hierarchical architecture**, combined with a **clear separation of responsibilities** between hardware components and robot actions.

The system uses an **abstract Robot class** as a common base, allowing the implementation of **specialized subclasses** for different types of actions (Forward, Backward, TurnLeft, TurnRight, Stop, ObstacleAvoidance).

**Encapsulation** is demonstrated by the use of private attributes and properties, while **polymorphism** is illustrated by the redefinition of the `move()` method in each subclass.

### :star: Main Features

- Robust object-oriented architecture
- Modular component system
- Integrated simulation for testing
- Error management and data validation

## :classical_building: Architecture

### Class Diagram
![](/img/ClassDiagram.jpg)

#### Explanation: Class Diagram
This diagram details the static software structure of our robot.

The Robot class acts as the parent class and central orchestrator. It owns instances of physical components through composition.
The component classes (Motor, Ultrasonic, ServoMotor) model the hardware. Each has clear responsibilities:
Motor: Manages the speed and direction of a motor.
Ultrasonic: Measures distance (`distance()`).
ServoMotor: Controls the orientation of a servomotor (`write_angle()`).
The behavioral subclasses (Forward, TurnRight, etc.) inherit from Robot and represent the different possible states or actions. Their main role is to implement a polymorphic version of the `move()` method, which translates a state (like "move forward") into concrete commands for the motors.

### Use Case Diagram
![](/img/UseCaseDiagram.jpg)

#### Explanation: Use Case Diagram
This diagram presents the functional interactions between actors and the robotic system.

Actors:
User: A human operator who initiates high-level movement commands (Forward, Stop).
Environment: Represents external conditions, such as obstacles, detected by the robot.
Use Cases:
The main actions are Forward, Backward, TurnLeft, TurnRight, and Stop.
The &lt;Include&gt; relationship is crucial: it means that the ObstacleAvoidance use case is systematically included in all movement actions. This ensures that the robot is constantly checking its environment to avoid collisions, making the system more robust and autonomous.

### Sequence Diagram
![](/img/sequenceDiagram.jpg)

#### Explanation: Sequence Diagram
This diagram illustrates the dynamic behavior of the system for a specific scenario: obstacle avoidance.

Scenario: The user presses a button to start the robot, which then moves forward.
Process:
Initialization: The User activates the Robot, which enters the Forward state and calls its `move()` method.
Detection loop: The robot enters a loop where it continuously requests the distance from its Ultrasonic sensor.
Decision making (alt):
If the distance is greater than 20, the robot continues to move forward (`Forward.move()`).
If the distance is less than 20, the robot stops (`Stop.move()`). It then uses its ServoMotor to look left and right, measuring the distance on each side.
Depending on the available space, it decides to enter the TurnLeft or TurnRight state and executes the corresponding movement.
End: The sequence ends when the user stops the robot.
This diagram is fundamental as it shows how objects from our different classes collaborate over time to accomplish a complex and autonomous task.

## :mag_right: Implementation

<details>
    <summary> Robot Class (Abstract Base) </summary>

### Robot Class (Abstract Base)

The `Robot` class serves as the abstract base for all types of robots. It defines the common interface and manages the basic components.

```python
from abc import ABC, abstractmethod
from typing import List
from component import Motor, ServoMotor, Ultrasonic

class Robot(ABC):
    def __init__(
        self,
        motors_ids: List[str],
        servo_id: str,
        ultrasonic_id: str
    ):
        """Initialize the robot with motors, servo, and ultrasonic sensor."""
        self._motors = [Motor(id) for id in motors_ids]
        self._servo = ServoMotor(servo_id)
        self._ultrasonic = Ultrasonic(ultrasonic_id)

    @property
    def servo(self) -> ServoMotor:
        """Get the servo motor."""
        return self._servo

    @servo.setter
    def servo(self, servo: ServoMotor):
        """Set the servo motor."""
        if not isinstance(servo, ServoMotor):
            raise ValueError("Servo must be an instance of ServoMotor")
        self._servo = servo

    @property
    def ultrasonic(self) -> Ultrasonic:
        """Get the ultrasonic sensor."""
        return self._ultrasonic

    @ultrasonic.setter
    def ultrasonic(self, ultrasonic: Ultrasonic):
        """Set the ultrasonic sensor."""
        if not isinstance(ultrasonic, Ultrasonic):
            raise ValueError("Ultrasonic must be an instance of Ultrasonic")
        self._ultrasonic = ultrasonic

    @abstractmethod
    def move(self, speed: int = 0):
        """Abstract method to move the robot."""
        pass
```

**Main features:**
- **Abstract class** using the `ABC` module
- **Encapsulation** with protected attributes (`_`)
- **Abstract method** `move()` to be implemented in subclasses
- **Composition** with hardware components (motors, servo, ultrasonic)

</details>

<details>
    <summary> Hardware Components </summary>

### Hardware Components

The system uses three main types of components, each with appropriate encapsulation:

#### Motor Class
```python
class Motor:
    def __init__(self, identifier: str):
        self._identifier = identifier
        self._speed = 0
        self._direction = "stop"

    def move_forward(self, speed: int):
        """Move the motor forward with the specified speed."""
        if not 0 <= speed <= 1023:
            raise ValueError("Speed must be between 0 and 1023")
        self._speed = speed
        self._direction = "forward"
        print(f"[SIMULATION MOTOR {self._identifier}] Moving forward with speed {speed}")

    def move_backward(self, speed: int):
        """Move the motor backward with the specified speed."""
        if not 0 <= speed <= 1023:
            raise ValueError("Speed must be between 0 and 1023")
        self._speed = speed
        self._direction = "backward"
        print(f"[SIMULATION MOTOR {self._identifier}] Moving backward with speed {speed}")

    def stop(self):
        """Stop the motor."""
        self._speed = 0
        self._direction = "stop"
        print(f"[SIMULATION MOTOR {self._identifier}] Stopped")

    @property
    def speed(self) -> int:
        """Get the current speed of the motor."""
        return self._speed

    @speed.setter
    def speed(self, speed: int):
        """Set the speed of the motor."""
        if not 0 <= speed <= 1023:
            raise ValueError("Speed must be between 0 and 1023")
        self._speed = speed

    @property
    def direction(self) -> str:
        """Get the current direction of the motor."""
        return self._direction

    @direction.setter
    def direction(self, value: str) -> None:
        """Set the direction of the motor."""
        valid_directions = ["forward", "backward", "stop"]
        if value not in valid_directions:
            raise ValueError(f"Direction must be one of {valid_directions}")
        self._direction = value

```

#### ServoMotor Class
```python
class ServoMotor:
    def __init__(self, identifier: str):
        self._identifier = identifier
        self._angle = 0

    def write_angle(self, degrees: Optional[float] = None, radians: Optional[float] = None):
        """Set the servo motor angle."""
        if degrees is None and radians is None:
            raise ValueError("An angle in degrees must be provided")
        if degrees is None:
            import math
            degrees = math.degrees(radians)
        self._angle = degrees % 360
        print(f"[SIMULATION SERVO {self._identifier}] Angle set to {self._angle} degrees")

    def stop(self):
        """Stop the servo motor."""
        print(f"[SIMULATION SERVO {self._identifier}] Stopped")

    @property
    def angle(self) -> float:
        """Get the current angle of the servo motor."""
        return self._angle

    @angle.setter
    def angle(self, degrees: float):
        """Set the angle of the motor."""
        self._angle = degrees % 360
```

#### Ultrasonic Class
```python
class Ultrasonic:
    def __init__(self, identifier: str):
        self._identifier = identifier

    def distance(self) -> float:
        """Measure the simulated distance."""
        distance = random.uniform(5, 100)
        print(f"[SIMULATION ULTRASONIC {self._identifier}] Measured distance: {distance:.2f} cm")
        return distance
```

</details>

<details>
    <summary> Specialized Actions </summary>

### Specialized Actions

Each action inherits from the `Robot` class and implements its own version of the `move()` method, demonstrating **polymorphism**.

#### Forward

The code below defines the `Forward` class, responsible for moving the robot straight ahead. It inherits from the abstract `Robot` class and individually controls the left and right motors. This action is integrated as the basic movement state, used in many navigation scenarios.

```python
class Forward(Robot):
    def __init__(
        self,
        left_motors_ids: List[str],
        right_motors_ids: List[str],
        servo_id: str,
        ultrasonic_id: str
    ):
        """Initialize the Forward movement with left and right motors."""
        super().__init__(left_motors_ids + right_motors_ids, servo_id, ultrasonic_id)
        self.__left_motors = self._motors[:len(left_motors_ids)]
        self.__right_motors = self._motors[len(left_motors_ids):]

    @property
    def left_motors(self) -> List[Motor]:
        """Get the left motors."""
        return self.__left_motors

    @left_motors.setter
    def left_motors(self, motors: List[Motor]):
        """Set the left motors."""
        if not motors or not all(isinstance(m, Motor) for m in motors):
            raise ValueError("Left motors must be a non-empty list of Motor instances")
        self.__left_motors = motors

    @property
    def right_motors(self) -> List[Motor]:
        """Get the right motors."""
        return self.__right_motors

    @right_motors.setter
    def right_motors(self, motors: List[Motor]):
        """Set the right motors."""
        if not motors or not all(isinstance(m, Motor) for m in motors):
            raise ValueError("Right motors must be a non-empty list of Motor instances")
        self.__right_motors = motors

    @property
    def servo(self) -> ServoMotor:
        """Get the servo motor."""
        return self._servo

    @property
    def ultrasonic(self) -> Ultrasonic:
        """Get the ultrasonic sensor."""
        return self._ultrasonic

    def move(self, speed: int = 512):
        """Move forward in a straight line."""
        if not 0 <= speed <= 1023:
            raise ValueError("Speed must be between 0 and 1023")
        for motor in self.__left_motors + self.__right_motors:
            motor.move_forward(speed)
```

#### TurnLeft

The `TurnLeft` class allows the robot to make a left turn by reducing the speed of the left motors and increasing the speed of the right ones. It inherits from `Robot` and illustrates the system's polymorphism, with each specialized action adapting the `move()` method for specific behavior.

```python
class TurnLeft(Robot):
    def __init__(
        self,
        left_motors_ids: List[str],
        right_motors_ids: List[str],
        servo_id: str,
        ultrasonic_id: str
    ):
        """Initialize the TurnLeft movement with left and right motors."""
        super().__init__(left_motors_ids + right_motors_ids, servo_id, ultrasonic_id)
        self.__left_motors = self._motors[:len(left_motors_ids)]
        self.__right_motors = self._motors[len(left_motors_ids):]

    @property
    def left_motors(self) -> List[Motor]:
        """Get the left motors."""
        return self.__left_motors

    @left_motors.setter
    def left_motors(self, motors: List[Motor]):
        """Set the left motors."""
        if not motors or not all(isinstance(m, Motor) for m in motors):
            raise ValueError("Left motors must be a non-empty list of Motor instances")
        self.__left_motors = motors

    @property
    def right_motors(self) -> List[Motor]:
        """Get the right motors."""
        return self.__right_motors

    @right_motors.setter
    def right_motors(self, motors: List[Motor]):
        """Set the right motors."""
        if not motors or not all(isinstance(m, Motor) for m in motors):
            raise ValueError("Right motors must be a non-empty list of Motor instances")
        self.__right_motors = motors

    @property
    def servo(self) -> ServoMotor:
        """Get the servo motor."""
        return self._servo

    @property
    def ultrasonic(self) -> Ultrasonic:
        """Get the ultrasonic sensor."""
        return self._ultrasonic

    def move(self, speed: int = 512):
        """Turn left."""
        if not 0 <= speed <= 1023:
            raise ValueError("Speed must be between 0 and 1023")
        for motor in self.__left_motors:
            motor.move_forward(speed // 3)
        for motor in self.__right_motors:
            motor.move_forward(speed)
```

#### ObstacleAvoidance

The `ObstacleAvoidance` class implements obstacle avoidance logic. It uses the ultrasonic sensor to measure distances and the servo motor to orient the sensor. Based on the measurements, it decides to turn or stop, ensuring the robot's safety and autonomy in its environment.

```python

class ObstacleAvoidance(Robot):
    def __init__(
        self,
        left_motors_ids: List[str],
        right_motors_ids: List[str],
        servo_id: str,
        ultrasonic_id: str
    ):
        """Initialize the ObstacleAvoidance movement with left and right motors."""
        super().__init__(left_motors_ids + right_motors_ids, servo_id, ultrasonic_id)
        self.__left_motors = self._motors[:len(left_motors_ids)]
        self.__right_motors = self._motors[len(left_motors_ids):]

    @property
    def left_motors(self) -> List[Motor]:
        """Get the left motors."""
        return self.__left_motors

    @left_motors.setter
    def left_motors(self, motors: List[Motor]):
        """Set the left motors."""
        if not motors or not all(isinstance(m, Motor) for m in motors):
            raise ValueError("Left motors must be a non-empty list of Motor instances")
        self.__left_motors = motors

    @property
    def right_motors(self) -> List[Motor]:
        """Get the right motors."""
        return self.__right_motors

    @right_motors.setter
    def right_motors(self, motors: List[Motor]):
        """Set the right motors."""
        if not motors or not all(isinstance(m, Motor) for m in motors):
            raise ValueError("Right motors must be a non-empty list of Motor instances")
        self.__right_motors = motors

    @property
    def servo(self) -> ServoMotor:
        """Get the servo motor."""
        return self._servo

    @property
    def ultrasonic(self) -> Ultrasonic:
        """Get the ultrasonic sensor."""
        return self._ultrasonic

    def avoid_obstacles(self, speed: int = 512, threshold_distance: float = 20.0):
        """Implement obstacle avoidance logic."""
        while True:
            try:
                distance = self.ultrasonic.distance()
                print(f"Measured distance: {distance:.2f} cm")
                if distance < threshold_distance:
                    print("Obstacle detected!")
                    for motor in self._motors:
                        motor.stop()
                    self.servo.write_angle(90)
                    time.sleep(0.5)
                    left_distance = self.ultrasonic.distance()
                    print(f"Left distance: {left_distance:.2f} cm")
                    self.servo.write_angle(-90)
                    time.sleep(0.5)
                    right_distance = self.ultrasonic.distance()
                    print(f"Right distance: {right_distance:.2f} cm")
                    self.servo.write_angle(0)
                    time.sleep(0.5)
                    if left_distance > right_distance and left_distance > threshold_distance:
                        print("Turning left")
                        for motor in self.__left_motors:
                            motor.move_forward(speed // 3)
                        for motor in self.__right_motors:
                            motor.move_forward(speed)
                        time.sleep(1)
                    elif right_distance > threshold_distance:
                        print("Turning right")
                        for motor in self.__left_motors:
                            motor.move_forward(speed)
                        for motor in self.__right_motors:
                            motor.move_forward(speed // 3)
                        time.sleep(1)
                    else:
                        print("No clear path, stopping")
                        for motor in self._motors:
                            motor.stop()
                        break
                else:
                    print("Path clear, moving forward")
                    for motor in self.__left_motors + self.__right_motors:
                        motor.move_forward(speed)
                time.sleep(0.1)
            except Exception as e:
                print(f"Error: {e}")
                for motor in self._motors:
                    motor.stop()
                break

    def move(self, speed: int = 512):
        """Start obstacle avoidance."""
        self.avoid_obstacles(speed, threshold_distance=20.0)
```

</details>

<details>
    <summary> Simulation System </summary>

### Simulation System

For testing without physical hardware, the system includes the following function:

```python
import time
from action import Forward, Backward, TurnLeft, TurnRight, Stop, ObstacleAvoidance
from typing import List

def main():
    """Run simulation for all robot movements."""
    left_motors_ids = ["motor_g1", "motor_g2"]
    right_motors_ids = ["motor_d1", "motor_d2"]
    servo_id = "servo_1"
    ultrasonic_id = "ultrasonic_1"

    print("=== Testing Forward ===")
    robot_forward = Forward(left_motors_ids, right_motors_ids, servo_id, ultrasonic_id)
    robot_forward.move(speed=512)
    time.sleep(1)

    print("\n=== Testing Backward ===")
    robot_backward = Backward(left_motors_ids, right_motors_ids, servo_id, ultrasonic_id)
    robot_backward.move(speed=512)
    time.sleep(1)

    print("\n=== Testing TurnLeft ===")
    robot_left = TurnLeft(left_motors_ids, right_motors_ids, servo_id, ultrasonic_id)
    robot_left.move(speed=512)
    time.sleep(1)

    print("\n=== Testing TurnRight ===")
    robot_right = TurnRight(left_motors_ids, right_motors_ids, servo_id, ultrasonic_id)
    robot_right.move(speed=512)
    time.sleep(1)

    print("\n=== Testing Stop ===")
    robot_stop = Stop(left_motors_ids, right_motors_ids, servo_id, ultrasonic_id)
    robot_stop.move()

    print("\n=== Testing ObstacleAvoidance ===")
    robot_obstacle = ObstacleAvoidance(left_motors_ids, right_motors_ids, servo_id, ultrasonic_id)
    robot_obstacle.move(speed=512)
    time.sleep(5)

if __name__ == "__main__":
    main()
```

</details>

<details>
    <summary> Demonstrated OOP Concepts </summary>

### Demonstrated OOP Concepts

#### 1. Encapsulation
- **Private attributes**: Use of double underscore (`__`) for private attributes
- **Properties**: Use of `@property` and `@setter` to control access
- **Validation**: Value control in setters
- **Protected methods**: Use of single underscore (`_`) for internal methods

#### 2. Inheritance
- **Abstract class**: `Robot` as an abstract base class with `ABC`
- **Multiple inheritance**: All actions inherit from `Robot`
- **Parent constructor call**: Use of `super().__init__()`
- **Code reuse**: Sharing of common attributes and methods

#### 3. Polymorphism
- **Abstract method**: `move()` defined in the base class
- **Redefinition**: Each subclass implements `move()` differently
- **Uniform interface**: All robots can be used in the same way
- **Specialized behaviors**: Each action has its own logic

#### 4. Composition
- **Object aggregation**: Robot composes motors, servo, and ultrasonic
- **Separation of responsibilities**: Each component has its specific function
- **Modularity**: Facilitates maintenance and extension

</details>

## :computer: Execution

<details>
    <summary>Development Mode</summary>

### Development Mode

Development mode uses simulation to test the code without physical hardware.

#### Running the Simulation

```bash
python simulation.py
```

#### Output


<iframe src="https://player.vimeo.com/video/123456789" width="640" height="360" frameborder="0" allowfullscreen></iframe>


</details>

## :toolbox: Tech Stack

### Main Language
- **Python 3.8+** - Main programming language
- **MicroPython** - For microcontroller execution

### Python Modules
- **abc** - Abstract classes
- **machine** - MicroPython hardware interface
- **time** - Time management
- **typing** - Type annotations
- **unittest** - Unit testing
- **random** - Data simulation

### Architecture
- **Object-Oriented Programming** - Main paradigm
- **Strategy Pattern** - Different robot actions
- **Composition Pattern** - Component assembly
- **Simulation** - Testing without hardware

## :test_tube: Validation

### Success Criteria

✅ **Robot class** correctly designed with relevant attributes  
✅ **Encapsulation** with getters/setters and appropriate visibility levels  
✅ **Well-structured inheritance** with at least six functional subclasses  
✅ **Polymorphism** demonstrated by redefining the `move()` method  
✅ **Complete UML documentation** with class, use case, and sequence diagrams  
✅ **Clean code** and well-commented with modular architecture  


### Demonstration of OOP Concepts

1. **Encapsulation**: Private (`__`), protected (`_`) attributes and properties
2. **Inheritance**: Abstract `Robot` class and specialized subclasses
3. **Polymorphism**: `move()` method redefined in each subclass
4. **Abstraction**: Common interface for all robot types
5. **Composition**: Assembly of hardware components in the robot

---

**IT Team Member:** 
- CHATIGRE Larissa
- COMLAN Ifè Léonce 
- AGBODJA Marzoukath

**Test:** Test 1 - Tekbot Robotics Challenges 
**Language:** Python 3.8+ / MicroPython  
**Date:** 2025