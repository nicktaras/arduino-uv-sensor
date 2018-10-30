# arduino-uv-sensor
A sketch and schema to utilise the Arduino UV sensor in a project.

Please check the datasheet of your UV sensor to ensure you are applying the correct settings.

Connection (using sensor module below):

Pin: A0 to Out
Pin: GND to GND
Pin: 3.3v to VCC

Sensor module used:

![alt text](https://github.com/nicktaras/arduino-uv-sensor/blob/master/images/uv_sensor_module.png?raw=true)

1. Operating Voltage:  DC 3.3-5V
2. Output voltage:  DC 0-1V
3. Test accuracy:  ±1UV INDEX
4. Current:  0.06mA(typ), 0.1mA(max).
5. Response wavelength:  200nm-370nm
6. Work temperature:  -20 Celsius ~85 Celsius
7. Detect UV wavelength:  200-370nm
8. Size: 19.80*15mm

UV information from EPA.gov:

UV Index Low - Green
A UV Index reading of 0 to 2 means low danger from the sun's UV rays for the average person.
 
Wear sunglasses on bright days.
If you burn easily, cover up and use broad spectrum SPF 30+ sunscreen.
Watch out for bright surfaces, like sand, water and snow, which reflect UV and increase exposure.
3 to 5: Moderate
UV Index Moderate - Yellow
A UV Index reading of 3 to 5 means moderate risk of harm from unprotected sun exposure.

Stay in shade near midday when the sun is strongest.
If outdoors, wear protective clothing, a wide-brimmed hat, and UV-blocking sunglasses.
Generously apply broad spectrum SPF 30+ sunscreen every 2 hours, even on cloudy days, and after swimming or sweating. 
Watch out for bright surfaces, like sand, water and snow, which reflect UV and increase exposure.
6 to 7: High
UV Index High - Orange
A UV Index reading of 6 to 7 means high risk of harm from unprotected sun exposure. Protection against skin and eye damage is needed.

Reduce time in the sun between 10 a.m. and 4 p.m.
If outdoors, seek shade and wear protective clothing, a wide-brimmed hat, and UV-blocking sunglasses.
Generously apply broad spectrum SPF 30+ sunscreen every 2 hours, even on cloudy days, and after swimming or sweating. 
Watch out for bright surfaces, like sand, water and snow, which reflect UV and increase exposure.
8 to 10: Very High
UV Index Very High - Red
A UV Index reading of 8 to 10 means very high risk of harm from unprotected sun exposure. Take extra precautions because unprotected skin and eyes will be damaged and can burn quickly.

Minimize sun exposure between 10 a.m. and 4 p.m.
If outdoors, seek shade and wear protective clothing, a wide-brimmed hat, and UV-blocking sunglasses.
Generously apply broad spectrum SPF 30+ sunscreen every 2 hours, even on cloudy days, and after swimming or sweating. 
Watch out for bright surfaces, like sand, water and snow, which reflect UV and increase exposure.
11 or more: Extreme
UV Index Extreme - Purple
A UV Index reading of 11 or more means extreme risk of harm from unprotected sun exposure. Take all precautions because unprotected skin and eyes can burn in minutes. 

Try to avoid sun exposure between 10 a.m. and 4 p.m.
If outdoors, seek shade and wear protective clothing, a wide-brimmed hat, and UV-blocking sunglasses.
Generously apply broad spectrum SPF 30+ sunscreen every 2 hours, even on cloudy days, and after swimming or sweating.
Watch out for bright surfaces, like sand, water and snow, which reflect UV and increase exposure.
The Shadow Rule
 
An easy way to tell how much UV exposure you are getting is to look for your shadow:

If your shadow is taller than you are (in the early morning and late afternoon), your UV exposure is likely to be lower.
If your shadow is shorter than you are (around midday), you are being exposed to higher levels of UV radiation. Seek shade and protect your skin and eyes.

