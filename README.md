# EKG-Health-Monitor
Health Monitoring Device that allows users to track essential health metrics by integrating physiological measurements.
- Authors: Bryan Lee, Sherryl Ooi

## Overview
Our project aims to create a health monitoring device that allows users to track essential health metrics by integrating three physiological measurements:
- Electrocardiogram (EKG): Records heart rate (Beats per Minute) by measuring electrical activity of the heart.
- Blood Oxygen Saturation (SpO2): Measures blood oxygen levels using the MAX30101 sensor.
- Body Temperature Sensor: Monitors body temperature in degrees Fahrenheit.
  
Our device will display heart rate waveforms, beats per minute, blood oxygen levels, and temperature on an LED display, providing real-time feedback on these vital signs. Additionally, it will transmit health information to electronic devices, such as laptops, through a web application that enables users to visualize their metrics on a graphical user interface (GUI) in real-time. Through this project, we aspire to enhance personal health management and empower users to take control of their health.

## Components
### Old Parts
- **Bluetooth microcontroller** - Silicon Labs [Link](https://www.mouser.com/ProductDetail/Silicon-Labs/BG22-EK4108A?qs=Wj%2FVkw3K%252BMA%252BDZRmSBK4gw%3D%3D&utm_id=20901965717&gad_source=1&gclid=Cj0KCQiAlsy5BhDeARIsABRc6ZvMG8KI5IQTmVyiOqFM4GXFpJ3lebvQjbRgS9jIvcbAZvR1BWExV6QaAu-mEALw_wcB)
- ⁠**MAX86150** ECG and PPG sensor [Link](https://www.analog.com/en/products/max86150.html#documentation)
- ⁠**MAX30205** Body temperature sensor [Link](https://www.analog.com/media/en/technical-documentation/data-sheets/MAX30205.pdf)

### New Parts
- **⁠AVR-BLE** microcontroller [Link](https://ww1.microchip.com/downloads/aemDocuments/documents/MCU08/ProductDocuments/UserGuides/AVR-BLE-Hardware-User-Guide-DS50002956B.pdf)
- **ECG Electrodes** sensor cable [Link](https://www.sparkfun.com/products/12970)
- **ILI9341 240X320** TFT LCD Display [Link](http://hiletgo.com/ProductDetail/2160039.html)
- **AD 8232** Single Lead Heart Rate Monitor [Link](https://www.sparkfun.com/products/12650)
- **MAX30101 & MAX32664** SparkFun Pulse Oximeter and Heart Rate Sensor [Link](https://www.analog.com/media/en/technical-documentation/data-sheets/max32664.pdf)

# Concepts
- **I2C (Inter-Integrated Circuit):** Communication with the MAX30205 sensor which allows
efficient data transfer over a two-wire interface.
- **ADC (Analog-to-Digital Converter):** Read analog signals from the heart rate monitor using the
microcontroller’s ADC to accurately measure heart activity.
- **UART (Universal Asynchronous Receiver/Transmitter):** Wireless communication, enabling
real-time data transmission between web applications and microcontrollers.
