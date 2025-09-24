# 2nd Test

<h2 align="center">ROS2 Publisher/Subscriber Documentation</h2>

<p align="center">
  <a href="#-objectifs">🎯 Objectifs</a> &nbsp;&bull;&nbsp;
  <a href="#-résumé">📝 Résumé</a> &nbsp;&bull;&nbsp;
  <a href="#-matériels">🧰 Matériels</a> &nbsp;&bull;&nbsp;
  <a href="#-structure-du-projet">🏗️ Structure</a> &nbsp;&bull;&nbsp;
  <a href="#-installation-complète">⚙️ Installation</a> &nbsp;&bull;&nbsp;
  <a href="#-implémentation">💻 Implémentation</a> &nbsp;&bull;&nbsp;
  <a href="#-espace-démo">🎬 Espace Démo</a> &nbsp;&bull;&nbsp;
  <a href="#-journal-des-erreurs">🐞 Journal des erreurs</a> &nbsp;&bull;&nbsp;
  <a href="#-perspectives">🔭 Perspectives</a> &nbsp;&bull;&nbsp;
  <a href="#-ressources">📚 Ressources</a>
</p>

---


| 🧩 Composant      |                                                                                                              Statut                                                                                                               |
|-------------------|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|
| Publisher Node    | [![Publisher - Implémenté](https://img.shields.io/badge/Publisher-Implémenté-green)](#-publisher-node) |
| Subscriber Node   | [![Subscriber - Implémenté](https://img.shields.io/badge/Subscriber-Implémenté-green)](#-subscriber-node) |
| GUI Subscriber    | [![GUI - Implémenté](https://img.shields.io/badge/GUI-Implémenté-green)](#-gui-subscriber-node) |
| Launch File       | [![Launch - Implémenté](https://img.shields.io/badge/Launch-Implémenté-green)](#-launch-file) |

:construction: <sub>Test 2 - Tekbot Robotics Challenges</sub>

<div>

---

## 🎯 Objectifs

L'objectif de ce test est de démontrer la capacité à concevoir un système robotique simple mais fonctionnel avec ROS2.  
Livrables attendus :
- Un **package ROS2** compilable sans erreur.
- Un **nœud Publisher** qui génère et publie des données de capteurs simulés à une fréquence de 0.5 seconde.
- Un **nœud Subscriber** qui reçoit ces données et les valide selon des plages spécifiques.
- Un **fichier de lancement** pour démarrer l'ensemble du système avec une seule commande.

---

## 📝 Résumé

Ce projet met en œuvre un système de communication ROS2 Publisher/Subscriber :
- Le nœud `publisher_node` simule des données de température, d'humidité et de pression, et les publie sur le topic `/sensor_data`.
- Le nœud `subscriber_node` écoute ce même topic, analyse les données reçues et affiche un message de statut dans le terminal, indiquant si les valeurs sont conformes ou non aux seuils définis.

---

## Fichiers téléchargeables

Tous les fichiers code et résultats obtenus sont téléchargeables via ce lien : [Test 2](https://github.com/TekBot-Robotics-Challenge/2025-Team-The_Winners-Docs/tree/main/Tekbot_The_Winners/computer_science/test2)

---

## 🧰 Matériels

- **Système d'exploitation** : Ubuntu 22.04 (ou via Distrobox)
- **Framework** : ROS 2 Humble Hawksbill
- **Langage de programmation** : Python 3
- **Outil de build** : colcon
- **Éditeur de code** : Visual Studio Code

---

## 🏗️ Structure du projet

```
ROS2_WS/
├── src/
│   └── sensor_data_evaluation/
│       ├── launch/
│       │   └── sensor_launch.py
│       ├── resource/
│       └── sensor_data_evaluation/
│           ├── __init__.py
│           ├── gui_subscriber.py
│           ├── sensor_publisher.py
│           └── sensor_subscriber.py
├── test/
├── package.xml
├── setup.cfg
├── setup.py
└── .env
```

---

## ⚙️ Installation complète

### 🐧 1. Installer ROS2 Humble sur Ubuntu 22.04

> [Installation de ROS2 — Guide officiel](https://docs.ros.org/en/humble/Installation/Ubuntu-Install-Debians.html)

```bash
sudo apt update && sudo apt upgrade
sudo locale-gen en_US en_US.UTF-8
sudo apt install software-properties-common
sudo add-apt-repository universe
sudo apt update && sudo apt install curl -y
sudo curl -sSL https://raw.githubusercontent.com/ros/rosdistro/master/ros.key -o /usr/share/keyrings/ros-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/ros-archive-keyring.gpg] http://packages.ros.org/ros2/ubuntu $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/ros2.list > /dev/null
sudo apt update
sudo apt install ros-humble-desktop-full python3-colcon-common-extensions
```
Avant de lancer ROS2, il faut exécuter dans le terminal :
```bash
source /opt/ros/humble/setup.bash
```
Maintenant lancer la commande:
```bash
ros2
```

<div align="center">
  ![Ros installation](/img/mp30.png)
   <p><i>Figure 1 : Installation de ROS2 terminée avec succès</i></p>
</div>

---

### 📦 2. Alternative : Installer Distrobox + ROS2 (toutes distributions)

> [Distrobox Documentation](https://distrobox.it/)

#### a. Installer Distrobox

```bash
# Sur la plupart des distributions Linux
sudo apt install distrobox podman
# ou
sudo dnf install distrobox podman
# ou
sudo pacman -S distrobox podman
```

#### b. Créer un conteneur Ubuntu 22.04

```bash
distrobox-create --name ros2box --image ubuntu:22.04
distrobox-enter ros2box
```

#### c. Installer ROS2 dans le conteneur

Répétez les commandes d'installation ROS2 ci-dessus dans le shell du conteneur.



---

### 🗂️ 3. Créer un workspace ROS2

> [Créer un workspace — ROS2 Tutorials](https://docs.ros.org/en/humble/Tutorials/Beginner-Client-Libraries/Creating-A-Workspace/Creating-A-Workspace.html)

```bash
mkdir -p ~/Ros_ws/src
cd ~/Ros_ws
colcon build
```

<div align="center">
<div align="center">
  ![](/img/colcon-build.png)
   <p><i>Figure 2 : Compilation de l'espace de travail</i></p>
</div>

</div>

---

### 🔽 4. Cloner et installer le projet

```bash
cd ~/Ros_ws/src
git clone <URL_DU_DEPOT>
cd ~/Ros_ws
colcon build --packages-select sensor_data_evaluation
source ~/Ros_ws/install/setup.bash
```

---

### 🚦 5. Lancer le système

> [Lancer un fichier launch — ROS2 Tutorials](https://docs.ros.org/en/humble/Tutorials/Launch-Files/Creating-Launch-Files.html)

```bash
ros2 launch sensor_data_evaluation sensor_launch.py
```
Vous verrez alors les messages Publisher et Subscriber dans le terminal.

<div align="center">
  ![](/img/launch.png)
   <p><i>Figure 3 : Affichage du terminal</i></p>
</div>
<div align="center">
  ![](/img/gui-interface.png)
   <p><i>Figure 4 : Affichage de l'interface graphique</i></p>
</div>


</div>

---

## 💻 Implémentation

### 📤 Publisher Node

Le nœud Publisher simule trois capteurs (température, humidité, pression) pour la température (15-35°C), l'humidité (30-70%) et la pression (950-1050 hPa), puis publie ces données toutes les 0.5 secondes sur des topics `/sensor_data` séparés. Il publie aussi un message groupé pour l'interface graphique. Il permet de tester la chaîne complète sans matériel réel. 

> [Créer un Publisher — ROS2 Python Tutorial](https://docs.ros.org/en/humble/Tutorials/Beginner-Client-Libraries/Writing-A-Simple-Py-Publisher-And-Subscriber.html#write-the-publisher-node)

<details>
  <summary>▶️ Voir le code complet</summary>

```python
# filepath: sensor_data_evaluation/sensor_data_evaluation/sensor_publisher.py
import rclpy
from rclpy.node import Node
from std_msgs.msg import Float32, String
import random

class SensorPublisher(Node):
    def __init__(self):
        super().__init__('sensor_publisher')
        # Publishers pour chaque capteur
        self.temp_pub = self.create_publisher(Float32, 'sensor_data/temperature', 10)
        self.hum_pub = self.create_publisher(Float32, 'sensor_data/humidity', 10)
        self.pres_pub = self.create_publisher(Float32, 'sensor_data/pressure', 10)
        # Publisher pour le GUI (message groupé)
        self.gui_pub = self.create_publisher(String, 'sensor_topic', 10)
        # Timer pour publier régulièrement
        self.timer = self.create_timer(0.5, self.publish_data)

    def publish_data(self):
        temp = random.uniform(10.0, 40.0)
        hum = random.uniform(20.0, 80.0)
        pres = random.uniform(900.0, 1100.0)
        # Publication séparée
        self.temp_pub.publish(Float32(data=temp))
        self.hum_pub.publish(Float32(data=hum))
        self.pres_pub.publish(Float32(data=pres))
        # Publication groupée pour GUI
        gui_msg = f"Temp:{temp:.2f},Hum:{hum:.2f},Pres:{pres:.2f}"
        self.gui_pub.publish(String(data=gui_msg))
        self.get_logger().info(f'Published - Temp: {temp:.2f} | Hum: {hum:.2f} | Pres: {pres:.2f}')

def main(args=None):
    rclpy.init(args=args)
    node = SensorPublisher()
    rclpy.spin(node)
    node.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':
    main()
```
</details>

---

### 📥 Subscriber Node

Ce nœud ROS2 reçoit les valeurs des capteurs et vérifie si elles sont dans les plages acceptables. Il affiche un message d'erreur si une valeur sort de la plage : 'hors plage' et un 'ok' quand ça respecte la plage. Cela permet de surveiller la validité des données.

> [Créer un Subscriber — ROS2 Python Tutorial](https://docs.ros.org/en/humble/Tutorials/Beginner-Client-Libraries/Writing-A-Simple-Py-Publisher-And-Subscriber.html#write-the-subscriber-node)

<details>
  <summary>▶️ Voir le code complet</summary>

```python
# filepath: sensor_data_evaluation/sensor_data_evaluation/sensor_subscriber.py
import rclpy
from rclpy.node import Node
from std_msgs.msg import Float32

class SensorSubscriber(Node):
    def __init__(self):
        super().__init__('sensor_subscriber')
        self.create_subscription(Float32, 'sensor_data/temperature', self.temp_callback, 10)
        self.create_subscription(Float32, 'sensor_data/humidity', self.hum_callback, 10)
        self.create_subscription(Float32, 'sensor_data/pressure', self.pres_callback, 10)

    def temp_callback(self, msg):
        value = msg.data
        if 15 <= value <= 35:
            self.get_logger().info(f'Temp OK : {value:.2f} °C')
        else:
            self.get_logger().error(f'Temp hors plage  : {value:.2f} °C')

    def hum_callback(self, msg):
        value = msg.data
        if 30 <= value <= 70:
            self.get_logger().info(f'Humidité OK : {value:.2f} %')
        else:
            self.get_logger().error(f'Humidité hors plage : {value:.2f} %')

    def pres_callback(self, msg):
        value = msg.data
        if 950 <= value <= 1050:
            self.get_logger().info(f'Pression OK : {value:.2f} hPa')
        else:
            self.get_logger().error(f'Pression hors plage  : {value:.2f} hPa')

def main(args=None):
    rclpy.init(args=args)
    node = SensorSubscriber()
    rclpy.spin(node)
    node.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':
    main()
```
</details>

---

### 🖥️ GUI Subscriber Node

Ce nœud ROS2 reçoit les données des capteurs (température, humidité, pression) et les affiche en temps réel sous forme de courbes et de statistiques grâce à Matplotlib. Il permet de visualiser l'évolution des mesures, de vérifier leur conformité aux plages attendues, et d'obtenir un bilan statistique (pourcentage de valeurs correctes/incorrectes).

> [Matplotlib Animation — Documentation](https://matplotlib.org/stable/users/explain/animations/index.html)

<details>
  <summary>▶️ Voir le code complet</summary>

```python
# filepath: sensor_data_evaluation/sensor_data_evaluation/gui_subscriber.py
import rclpy
from rclpy.node import Node
from std_msgs.msg import Float32
import threading
import matplotlib.pyplot as plt
from matplotlib.animation import FuncAnimation

class SensorSubscriber(Node):
    def __init__(self):
        super().__init__('gui_subscriber')

        self.temps = []
        self.temp_values = []
        self.hum_values = []
        self.pres_values = []

        self.temp_range = (15, 35)
        self.hum_range = (30, 70)
        self.pres_range = (950, 1050)

        self.counter = 0
        self.lock = threading.Lock()

        self.create_subscription(Float32, 'sensor_data/temperature', self.temp_callback, 10)
        self.create_subscription(Float32, 'sensor_data/humidity', self.hum_callback, 10)
        self.create_subscription(Float32, 'sensor_data/pressure', self.pres_callback, 10)

        self.last_temp = None
        self.last_hum = None
        self.last_pres = None

    def temp_callback(self, msg):
        with self.lock:
            self.last_temp = msg.data
            self.update_data_if_ready()

    def hum_callback(self, msg):
        with self.lock:
            self.last_hum = msg.data
            self.update_data_if_ready()

    def pres_callback(self, msg):
        with self.lock:
            self.last_pres = msg.data
            self.update_data_if_ready()

    def update_data_if_ready(self):
        if self.last_temp is not None and self.last_hum is not None and self.last_pres is not None:
            self.counter += 1
            self.temps.append(self.counter)
            self.temp_values.append(self.last_temp)
            self.hum_values.append(self.last_hum)
            self.pres_values.append(self.last_pres)
            self.last_temp = self.last_hum = self.last_pres = None

    def get_data(self):
        with self.lock:
            return (list(self.temps), list(self.temp_values), list(self.hum_values), list(self.pres_values))


def ros_spin(node):
    rclpy.spin(node)
    node.destroy_node()
    rclpy.shutdown()


def main(args=None):
    rclpy.init(args=args)
    node = SensorSubscriber()
    ros_thread = threading.Thread(target=ros_spin, args=(node,), daemon=True)
    ros_thread.start()

    # Crée 4 sous-graphes (3 pour courbes, 1 pour tableau)
    fig, axs = plt.subplots(4, 1, figsize=(9, 12))
    ax1, ax2, ax3, table_ax = axs
    plt.subplots_adjust(hspace=0.6, bottom=0.2)

    def draw_band(ax, low, high, color='green', alpha=0.2):
        ax.axhspan(low, high, facecolor=color, alpha=alpha)

    def compute_stats(values, value_range):
        total = len(values)
        if total == 0:
            return (0, 0)
        good = sum(value_range[0] <= v <= value_range[1] for v in values)
        bad = total - good
        return (good / total * 100, bad / total * 100)

    def update(frame):
        temps, temp_vals, hum_vals, pres_vals = node.get_data()

        # Clear all 4 axes
        for ax in axs:
            ax.clear()

        if temps:
            # Température
            ymin, ymax = node.temp_range[0] - 5, node.temp_range[1] + 5
            ax1.set_ylim(ymin, ymax)
            draw_band(ax1, *node.temp_range, color='green')
            ax1.plot(temps, temp_vals, label='Température', color='blue')
            ax1.set_ylabel('°C')
            ax1.set_title('Température')
            ax1.legend()
            color_temp = 'green' if node.temp_range[0] <= temp_vals[-1] <= node.temp_range[1] else 'red'
            ax1.text(0.5, -0.35, f"Valeur actuelle : {temp_vals[-1]:.2f} °C", color=color_temp,
                     transform=ax1.transAxes, ha='center', fontsize=10)

            # Humidité
            ymin, ymax = node.hum_range[0] - 10, node.hum_range[1] + 10
            ax2.set_ylim(ymin, ymax)
            draw_band(ax2, *node.hum_range, color='green')
            ax2.plot(temps, hum_vals, label='Humidité', color='orange')
            ax2.set_ylabel('%')
            ax2.set_title('Humidité')
            ax2.legend()
            color_hum = 'green' if node.hum_range[0] <= hum_vals[-1] <= node.hum_range[1] else 'red'
            ax2.text(0.5, -0.35, f"Valeur actuelle : {hum_vals[-1]:.2f} %", color=color_hum,
                     transform=ax2.transAxes, ha='center', fontsize=10)

            # Pression
            ymin, ymax = node.pres_range[0] - 20, node.pres_range[1] + 20
            ax3.set_ylim(ymin, ymax)
            draw_band(ax3, *node.pres_range, color='green')
            ax3.plot(temps, pres_vals, label='Pression', color='purple')
            ax3.set_ylabel('hPa')
            ax3.set_title('Pression')
            ax3.legend()
            color_pres = 'green' if node.pres_range[0] <= pres_vals[-1] <= node.pres_range[1] else 'red'
            ax3.text(0.5, -0.35, f"Valeur actuelle : {pres_vals[-1]:.2f} hPa", color=color_pres,
                     transform=ax3.transAxes, ha='center', fontsize=10)

            # Tableau de statistiques
            temp_good, temp_bad = compute_stats(temp_vals, node.temp_range)
            hum_good, hum_bad = compute_stats(hum_vals, node.hum_range)
            pres_good, pres_bad = compute_stats(pres_vals, node.pres_range)

            table_data = [
                ["Température", len(temp_vals), f"{temp_good:.1f}%", f"{temp_bad:.1f}%"],
                ["Humidité", len(hum_vals), f"{hum_good:.1f}%", f"{hum_bad:.1f}%"],
                ["Pression", len(pres_vals), f"{pres_good:.1f}%", f"{pres_bad:.1f}%"]
            ]
            col_labels = ["Mesure", "Total", "Bonnes", "Mauvaises"]

            table_ax.axis("off")
            table = table_ax.table(cellText=table_data, colLabels=col_labels, loc='center', cellLoc='center')

            for i in range(1, 4):
                table[(i, 2)].set_facecolor("#d0f0c0")  # vert clair
                table[(i, 3)].set_facecolor("#f8d0d0")  # rouge clair

            table.scale(1, 1.5)
            table.set_fontsize(10)
            table_ax.set_title("Bilan Statistique des Mesures", fontsize=12, fontweight="bold", pad=10)
        else:
            for ax in axs:
                ax.text(0.5, 0.5, "Aucune donnée reçue", ha='center', va='center', transform=ax.transAxes)

    ani = FuncAnimation(fig, update, interval=1000)
    plt.show()
    ros_thread.join()


if __name__ == '__main__':
    main()
```
</details>

---

### 🚦 Launch File

Ce fichier permet de lancer automatiquement les trois nœuds (publisher, subscriber, interface graphique) avec une seule commande. Il simplifie le déploiement de l'application.

> [Créer un fichier launch — ROS2 Launch Tutorial](https://docs.ros.org/en/humble/Tutorials/Launch-Files/Creating-Launch-Files.html)

<details>
  <summary>▶️ Voir le code complet</summary>

```python
# filepath: sensor_data_evaluation/launch/sensor_launch.py
from launch import LaunchDescription
from launch_ros.actions import Node

def generate_launch_description():
    return LaunchDescription([
        Node(
            package='sensor_data_evaluation',
            executable='sensor_publisher',
            name='sensor_publisher'
        ),
        Node(
            package='sensor_data_evaluation',
            executable='sensor_subscriber',
            name='sensor_subscriber'
        ),
        Node(
            package='sensor_data_evaluation',
            executable='gui_subscriber',
            name='gui_subscriber'
        )
    ])
```
</details>

---

## 🎬 Espace Démo

### 📹 Vidéo de Démonstration du Système ROS2



### 📊 Éléments visibles dans la démo :

| 🖥️ Terminal | 📈 Interface Graphique | ✅ Validation |
|-------------|------------------------|---------------|
| Messages Publisher avec valeurs des capteurs | Courbes temps réel (Température, Humidité, Pression) | Vérification des seuils |
| Messages Subscriber avec statut OK/Hors plage | Bandes de validation colorées | Messages d'alerte hors plage |
| Logs ROS2 en temps réel | Tableau statistiques (% bonnes/mauvaises valeurs) | Indicateurs visuels colorés |

<center>
<iframe
  src="https://www.veed.io/view/627c1e6b-60f9-46c6-9233-f06be74c6f42?panel=share"
  width="800"
  height="600"
  frameborder="0"
  allowfullscreen>
</iframe>
</center>

---

## 🌐 Communication multimachine DDS

La communication multimachine via DDS (Data Distribution Service) permet à plusieurs machines de partager des données en temps réel de manière fiable et efficace, sans dépendre d’un serveur central. DDS facilite l’échange d’informations entre applications distribuées grâce à un modèle publish/subscribe.

### Vidéos de démonstration

#### PC1

<center>
<iframe
  src="https://www.veed.io/view/8f7d8a0f-9be6-4c50-bae3-db6a898a8e4d?panel=share"
  width="800"
  height="600"
  frameborder="0"
  allowfullscreen>
</iframe>
</center>

#### PC2

<center>
<iframe
  src="https://www.veed.io/view/d2ed83f7-4880-4fe3-a865-9c5456e395fa?panel=share"
  width="800"
  height="600"
  frameborder="0"
  allowfullscreen>
</iframe>
</center>



---
---

## 🐞 Journal des erreurs

| Date       | Erreur rencontrée                                             | Cause                                                                  | Solution apportée                                                                                             |
| :--------- | :------------------------------------------------------------ | :--------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------ |
| 15/06/2025 | `colcon build` échoue, le package n'est pas trouvé.           | Oubli de déclarer les dépendances (`rclpy`) dans le `package.xml`.      | Ajout de `<exec_depend>rclpy</exec_depend>` dans `package.xml`. |
| 15/06/2025 | Le subscriber ne reçoit aucun message.                        | Nom du topic différent entre publisher et subscriber.                   | Correction du nom du topic pour qu'il corresponde exactement à `/sensor_data`.                  |
| 16/06/2025 | Les nœuds s'arrêtent juste après le lancement.                | Oubli de `rclpy.spin()` dans le main.                                   | Ajout de `rclpy.spin(node_name)` à la fin de chaque nœud. |

---

## 🔭 Perspectives

- Utiliser des messages personnalisés (`SensorData.msg`) pour structurer les données.  
  [Créer un message personnalisé — ROS2](https://docs.ros.org/en/humble/Tutorials/Beginner-Client-Libraries/Custom-ROS2-Interfaces.html)
- Ajouter un nœud de logging pour enregistrer les données dans un fichier `.csv`.
- Visualiser les données en temps réel avec `rqt_plot` ou équivalent.  
  [Visualiser avec rqt_plot — ROS2](https://docs.ros.org/en/humble/Tutorials/Tools/Using-Rqt-Console-And-Rqt-Logger.html)
- Implémenter la reconfiguration dynamique des seuils de validation.

---

## 📚 Ressources

- [Documentation Officielle de ROS2 Humble](https://docs.ros.org/en/humble/index.html)
- [Tutoriels ROS2 Husarion](https://husarion.com/tutorials/ros2-tutorials)
- [Distrobox Documentation](https://distrobox.it/)
- [ROS2 Python Tutorials](https://docs.ros.org/en/humble/Tutorials/Beginner-Client-Libraries/Writing-A-Simple-Py-Publisher-And-Subscriber.html)
- [Launch Files ROS2](https://docs.ros.org/en/humble/Tutorials/Launch-Files/Creating-Launch-Files.html)
- [Matplotlib Animation](https://matplotlib.org/stable/users/explain/animations/index.html)
- [ROS2 Multiple Machines Tutorials](https://roboticsbackend.com/ros2-multiple-machines-including-raspberry-pi/)

---

## 👥 Auteurs

- Chatigre Larissa  
- Ife Leonce Comlan  
- Agbodja Marzoukath  

**Test :** Test 2 - Tekbot Robotics Challenges  
**Langage :** Python 3 / ROS2  
**Framework :** ROS2 Humble  
**Date :** Juin 2025

---

<div align="center">
<p><sub>© 2025 Test 2 - Tekbot Robotics Challenges. Projet développé dans le cadre de l'évaluation ROS2.</sub></p>
</div>