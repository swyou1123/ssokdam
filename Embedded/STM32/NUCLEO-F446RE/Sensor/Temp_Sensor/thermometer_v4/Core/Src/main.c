/* USER CODE BEGIN Header */
/**
  ******************************************************************************
  * @file           : main.c
  * @brief          : Main program body
  ******************************************************************************
  * @attention
  *
  * Copyright (c) 2022 STMicroelectronics.
  * All rights reserved.
  *
  * This software is licensed under terms that can be found in the LICENSE file
  * in the root directory of this software component.
  * If no LICENSE file comes with this software, it is provided AS-IS.
  *
  ******************************************************************************
  */
/* USER CODE END Header */
/* Includes ------------------------------------------------------------------*/
#include "main.h"

/* Private includes ----------------------------------------------------------*/
/* USER CODE BEGIN Includes */
#include <stdio.h>
#include <math.h>
/* USER CODE END Includes */

/* Private typedef -----------------------------------------------------------*/
/* USER CODE BEGIN PTD */

/* USER CODE END PTD */

/* Private define ------------------------------------------------------------*/
/* USER CODE BEGIN PD */
#define MLX90614_addr 0x5A
#define mlx_cmd_pointer 1
#define mlx_cmd_amb 0x06
#define mlx_cmd_obj_1 0x07
#define mlx_cmd_obj_2 0x08
#define mlx_cmd_emissivity 0x24
#define mlx_cmd_emissivity_2 0x2F
/* USER CODE END PD */

/* Private macro -------------------------------------------------------------*/
/* USER CODE BEGIN PM */

/* USER CODE END PM */

/* Private variables ---------------------------------------------------------*/
I2C_HandleTypeDef hi2c1;

UART_HandleTypeDef huart2;

/* USER CODE BEGIN PV */
uint8_t mlx_read_buffer[6]={0xB4,0x00,0xB5,0};
uint8_t mlx_write_buffer[5]={0xB4,0};
uint8_t mlx_write_zero[5]={0xB4,0};
char uart_buf[30];
/* USER CODE END PV */

/* Private function prototypes -----------------------------------------------*/
void SystemClock_Config(void);
static void MX_GPIO_Init(void);
static void MX_I2C1_Init(void);
static void MX_USART2_UART_Init(void);
/* USER CODE BEGIN PFP */

/* USER CODE END PFP */

/* Private user code ---------------------------------------------------------*/
/* USER CODE BEGIN 0 */
void mlx_read_temperature(void)
{
	double temp_obj_1, temp_obj_2, temp_amb;
	mlx_read_buffer[mlx_cmd_pointer]=mlx_cmd_amb;

	HAL_I2C_Mem_Read_IT(&hi2c1,(uint16_t)MLX90614_addr<<1,mlx_cmd_amb,I2C_MEMADD_SIZE_8BIT,
			(uint8_t *)&mlx_read_buffer[3],3);

	while(HAL_I2C_GetState(&hi2c1)!=HAL_I2C_STATE_READY)
	{

	}
	temp_amb=(mlx_read_buffer[4]<<8|mlx_read_buffer[3]);
	temp_amb=(temp_amb*0.02)-273.15;

	memset(uart_buf,0,30);
	sprintf(uart_buf, "amb : %.2lf\n\r", temp_amb);
	HAL_UART_Transmit_IT(&huart2, uart_buf, sizeof(uart_buf));

	mlx_read_buffer[mlx_cmd_pointer]=mlx_cmd_obj_1;
	HAL_I2C_Mem_Read_IT(&hi2c1,(uint16_t)MLX90614_addr<<1,mlx_cmd_obj_1,I2C_MEMADD_SIZE_8BIT,
    	(uint8_t *)&mlx_read_buffer[3],3);
	while(HAL_I2C_GetState(&hi2c1)!=HAL_I2C_STATE_READY)
	{

	}
	temp_obj_1=(mlx_read_buffer[4]<<8|mlx_read_buffer[3]);
	temp_obj_1=(temp_obj_1*0.02)-273.15;

	memset(uart_buf,0,30);
	sprintf(uart_buf, "obj1 : %.2lf\n\r", temp_obj_1);
	HAL_UART_Transmit_IT(&huart2, uart_buf, sizeof(uart_buf));

	/*
	Object 2 temperature, RAM-0x07
	*/
	mlx_read_buffer[mlx_cmd_pointer]=mlx_cmd_obj_2;
	HAL_I2C_Mem_Read_IT(&hi2c1,(uint16_t)MLX90614_addr<<1,mlx_cmd_obj_2,I2C_MEMADD_SIZE_8BIT,
    	(uint8_t *)&mlx_read_buffer[3],3);
	while(HAL_I2C_GetState(&hi2c1)!=HAL_I2C_STATE_READY)
	{

	}
	temp_obj_2=(mlx_read_buffer[4]<<8|mlx_read_buffer[3]);
	temp_obj_2=(temp_obj_2*0.02)-273.15;

	memset(uart_buf,0,30);
	sprintf(uart_buf, "obj2 : %.2lf\n\r", temp_obj_2);
	HAL_UART_Transmit_IT(&huart2, uart_buf, sizeof(uart_buf));
}

void mlx_sleep()
{
	uint8_t enter_sleep[2]={0xFF,0xE8};	//0xFF-Sleep CMD, 0xE8-PEC (0xB4+0xFF)
	HAL_I2C_Master_Transmit_IT(&hi2c1,(uint16_t)MLX90614_addr<<1,(uint8_t *)&enter_sleep,2);
	while(HAL_I2C_GetState(&hi2c1)!=HAL_I2C_STATE_READY)
	{
	}
}

void mlx_wakeup()
{

	HAL_I2C_DeInit(&hi2c1);
	GPIO_InitTypeDef GPIO_InitStruct = {0};
	HAL_GPIO_WritePin(GPIOB, GPIO_PIN_7, GPIO_PIN_RESET);
	GPIO_InitStruct.Pin = GPIO_PIN_7;
	GPIO_InitStruct.Mode = GPIO_MODE_OUTPUT_PP;
	GPIO_InitStruct.Pull = GPIO_NOPULL;
	HAL_GPIO_Init(GPIOB, &GPIO_InitStruct);
	HAL_Delay(33);
	HAL_GPIO_DeInit(GPIOB,GPIO_PIN_7);

	HAL_I2C_Init(&hi2c1);
	HAL_Delay(250);

}
/* USER CODE END 0 */

/**
  * @brief  The application entry point.
  * @retval int
  */
int main(void)
{
  /* USER CODE BEGIN 1 */

  /* USER CODE END 1 */

  /* MCU Configuration--------------------------------------------------------*/

  /* Reset of all peripherals, Initializes the Flash interface and the Systick. */
  HAL_Init();

  /* USER CODE BEGIN Init */

  /* USER CODE END Init */

  /* Configure the system clock */
  SystemClock_Config();

  /* USER CODE BEGIN SysInit */

  /* USER CODE END SysInit */

  /* Initialize all configured peripherals */
  MX_GPIO_Init();
  MX_I2C1_Init();
  MX_USART2_UART_Init();
  /* USER CODE BEGIN 2 */
  HAL_Delay(1000);
  uint8_t str[] = "MLX90614\n\r";
  HAL_UART_Transmit_IT(&huart2, str, sizeof(str));
  HAL_Delay(100);
  mlx_sleep();
  mlx_wakeup();
  HAL_Delay(500);
  memset(uart_buf,0,30);
  sprintf(uart_buf, "temperature : ---\n\r");
  HAL_UART_Transmit_IT(&huart2, uart_buf, sizeof(uart_buf));
  /* USER CODE END 2 */

  /* Infinite loop */
  /* USER CODE BEGIN WHILE */
  while (1)
  {
	  mlx_read_temperature();
	  HAL_Delay(1000);
    /* USER CODE END WHILE */

    /* USER CODE BEGIN 3 */
  }
  /* USER CODE END 3 */
}

/**
  * @brief System Clock Configuration
  * @retval None
  */
void SystemClock_Config(void)
{
  RCC_OscInitTypeDef RCC_OscInitStruct = {0};
  RCC_ClkInitTypeDef RCC_ClkInitStruct = {0};

  /** Configure the main internal regulator output voltage
  */
  __HAL_RCC_PWR_CLK_ENABLE();
  __HAL_PWR_VOLTAGESCALING_CONFIG(PWR_REGULATOR_VOLTAGE_SCALE3);

  /** Initializes the RCC Oscillators according to the specified parameters
  * in the RCC_OscInitTypeDef structure.
  */
  RCC_OscInitStruct.OscillatorType = RCC_OSCILLATORTYPE_HSI;
  RCC_OscInitStruct.HSIState = RCC_HSI_ON;
  RCC_OscInitStruct.HSICalibrationValue = RCC_HSICALIBRATION_DEFAULT;
  RCC_OscInitStruct.PLL.PLLState = RCC_PLL_NONE;
  if (HAL_RCC_OscConfig(&RCC_OscInitStruct) != HAL_OK)
  {
    Error_Handler();
  }

  /** Initializes the CPU, AHB and APB buses clocks
  */
  RCC_ClkInitStruct.ClockType = RCC_CLOCKTYPE_HCLK|RCC_CLOCKTYPE_SYSCLK
                              |RCC_CLOCKTYPE_PCLK1|RCC_CLOCKTYPE_PCLK2;
  RCC_ClkInitStruct.SYSCLKSource = RCC_SYSCLKSOURCE_HSI;
  RCC_ClkInitStruct.AHBCLKDivider = RCC_SYSCLK_DIV1;
  RCC_ClkInitStruct.APB1CLKDivider = RCC_HCLK_DIV1;
  RCC_ClkInitStruct.APB2CLKDivider = RCC_HCLK_DIV1;

  if (HAL_RCC_ClockConfig(&RCC_ClkInitStruct, FLASH_LATENCY_0) != HAL_OK)
  {
    Error_Handler();
  }
}

/**
  * @brief I2C1 Initialization Function
  * @param None
  * @retval None
  */
static void MX_I2C1_Init(void)
{

  /* USER CODE BEGIN I2C1_Init 0 */

  /* USER CODE END I2C1_Init 0 */

  /* USER CODE BEGIN I2C1_Init 1 */

  /* USER CODE END I2C1_Init 1 */
  hi2c1.Instance = I2C1;
  hi2c1.Init.ClockSpeed = 100000;
  hi2c1.Init.DutyCycle = I2C_DUTYCYCLE_2;
  hi2c1.Init.OwnAddress1 = 0;
  hi2c1.Init.AddressingMode = I2C_ADDRESSINGMODE_7BIT;
  hi2c1.Init.DualAddressMode = I2C_DUALADDRESS_DISABLE;
  hi2c1.Init.OwnAddress2 = 0;
  hi2c1.Init.GeneralCallMode = I2C_GENERALCALL_DISABLE;
  hi2c1.Init.NoStretchMode = I2C_NOSTRETCH_DISABLE;
  if (HAL_I2C_Init(&hi2c1) != HAL_OK)
  {
    Error_Handler();
  }
  /* USER CODE BEGIN I2C1_Init 2 */

  /* USER CODE END I2C1_Init 2 */

}

/**
  * @brief USART2 Initialization Function
  * @param None
  * @retval None
  */
static void MX_USART2_UART_Init(void)
{

  /* USER CODE BEGIN USART2_Init 0 */

  /* USER CODE END USART2_Init 0 */

  /* USER CODE BEGIN USART2_Init 1 */

  /* USER CODE END USART2_Init 1 */
  huart2.Instance = USART2;
  huart2.Init.BaudRate = 115200;
  huart2.Init.WordLength = UART_WORDLENGTH_8B;
  huart2.Init.StopBits = UART_STOPBITS_1;
  huart2.Init.Parity = UART_PARITY_NONE;
  huart2.Init.Mode = UART_MODE_TX_RX;
  huart2.Init.HwFlowCtl = UART_HWCONTROL_NONE;
  huart2.Init.OverSampling = UART_OVERSAMPLING_16;
  if (HAL_UART_Init(&huart2) != HAL_OK)
  {
    Error_Handler();
  }
  /* USER CODE BEGIN USART2_Init 2 */

  /* USER CODE END USART2_Init 2 */

}

/**
  * @brief GPIO Initialization Function
  * @param None
  * @retval None
  */
static void MX_GPIO_Init(void)
{

  /* GPIO Ports Clock Enable */
  __HAL_RCC_GPIOA_CLK_ENABLE();
  __HAL_RCC_GPIOB_CLK_ENABLE();

}

/* USER CODE BEGIN 4 */

/* USER CODE END 4 */

/**
  * @brief  This function is executed in case of error occurrence.
  * @retval None
  */
void Error_Handler(void)
{
  /* USER CODE BEGIN Error_Handler_Debug */
  /* User can add his own implementation to report the HAL error return state */
  __disable_irq();
  while (1)
  {
  }
  /* USER CODE END Error_Handler_Debug */
}

#ifdef  USE_FULL_ASSERT
/**
  * @brief  Reports the name of the source file and the source line number
  *         where the assert_param error has occurred.
  * @param  file: pointer to the source file name
  * @param  line: assert_param error line source number
  * @retval None
  */
void assert_failed(uint8_t *file, uint32_t line)
{
  /* USER CODE BEGIN 6 */
  /* User can add his own implementation to report the file name and line number,
     ex: printf("Wrong parameters value: file %s on line %d\r\n", file, line) */
  /* USER CODE END 6 */
}
#endif /* USE_FULL_ASSERT */
