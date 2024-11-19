/*
 * File:   main.c
 * Author: Bryan Lee, Sherryl Ooi
 * 
 * EKG HEALTH MONITOR
 * Created on November 17, 2024
 */

#define F_CPU 3333333UL

#include <avr/io.h>
#include <stdio.h>
#include <util/delay.h>

// LCD Pin Definitions
#define LCD_RS_PIN      0    // PC0
#define LCD_EN_PIN      1    // PC1

void LCD_SendNibble(uint8_t nibble) {
    // Send upper 4 bits
    PORTA.OUT = (PORTA.OUT & 0x0F) | (nibble & 0xF0);
    
    // Toggle Enable pin with longer delays for reliability
    _delay_us(10);
    PORTC.OUTSET = (1 << LCD_EN_PIN);
    _delay_us(10);
    PORTC.OUTCLR = (1 << LCD_EN_PIN);
    _delay_us(10);
}

void LCD_SendCommand(uint8_t command) {
    PORTC.OUTCLR = (1 << LCD_RS_PIN);
    _delay_us(10);
    
    LCD_SendNibble(command & 0xF0);
    LCD_SendNibble((command << 4) & 0xF0);
    
    _delay_ms(5);
}

void LCD_SendData(uint8_t data) {
    PORTC.OUTSET = (1 << LCD_RS_PIN);
    _delay_us(10);
    
    LCD_SendNibble(data & 0xF0);
    LCD_SendNibble((data << 4) & 0xF0);
    
    _delay_ms(5);
}

void LCD_Init(void) {
    // Set up pins
    PORTC.DIRSET = (1 << LCD_RS_PIN) | (1 << LCD_EN_PIN);
    PORTA.DIRSET = 0xF0;  // PA4-PA7 as outputs
    
    // Start with all pins low
    PORTC.OUTCLR = (1 << LCD_RS_PIN) | (1 << LCD_EN_PIN);
    PORTA.OUT &= 0x0F;

    // Long power-on delay
    _delay_ms(150);

    // Force 8-bit mode first (3 times)
    for(uint8_t i = 0; i < 3; i++) {
        LCD_SendNibble(0x30);
        _delay_ms(10);
    }

    // Switch to 4-bit mode
    LCD_SendNibble(0x20);
    _delay_ms(10);

    // Initialize display
    LCD_SendCommand(0x28);  // 4-bit mode, 2 lines
    _delay_ms(5);
    LCD_SendCommand(0x0C);  // Display ON, cursor OFF
    _delay_ms(5);
    LCD_SendCommand(0x01);  // Clear display
    _delay_ms(5);
    LCD_SendCommand(0x06);  // Entry mode set
    _delay_ms(5);
}


int main(void) {
    char first_line[17];  // Buffer for the first line
    char second_line[17]; // Buffer for the second line

    // LCD Initialization
    LCD_Init();
    _delay_ms(50);

    // Define some test data
    uint8_t bpm_values[] = {75, 80, 98, 120};
    uint8_t sp02_values[] = {97, 98, 96, 100};
    uint8_t temp_values[] = {36, 37, 36, 37};
    size_t num_values = sizeof(bpm_values) / sizeof(bpm_values[0]);

    // Set up the titles for the first line
    snprintf(first_line, 17, " BPM  SP02  Temp");

    while (1) {
        for (size_t i = 0; i < num_values; i++) {
            // Clear display
            LCD_SendCommand(0x01);
            _delay_ms(5);

            // Display the first line (static titles)
            LCD_SendCommand(0x80); // Set cursor to the first line
            _delay_ms(5);
            for (char *c = first_line; *c; c++) {
                LCD_SendData(*c);
            }

            // Prepare and display the second line (dynamic values)
            snprintf(second_line, 17, "%4d  %3d%%  %3dC", 
                     bpm_values[i], sp02_values[i], temp_values[i]);
            LCD_SendCommand(0xC0); // Set cursor to the second line
            _delay_ms(5);
            for (char *c = second_line; *c; c++) {
                LCD_SendData(*c);
            }

            // Wait before updating
            _delay_ms(1000); // Simulate real-time update
        }
    }

    return 0;
}