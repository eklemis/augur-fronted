from faker import Faker
import json
import random

fake = Faker()

def create_mock_distributor_data(num_records):
    data = []
    for _ in range(num_records):
        name = fake.company()
        shipped_last_month = random.randint(100, 2000)  # You can adjust the range as needed
        forecast_next_month = random.randint(100, 2000)  # Random forecast
        average_shipped_ytd = round(random.uniform(100, 2000), 2)  # YTD average with 2 decimal places

        data.append({
            "name": name,
            "shippedLastMonth": shipped_last_month,
            "forecastNextMonth": forecast_next_month,
            "averageShippedYTD": average_shipped_ytd
        })
    return data

# Generate 1000 records
mock_data = create_mock_distributor_data(1000)

# Write the data to a JSON file
with open('distributor_mock_data.json', 'w') as f:
    json.dump(mock_data, f, indent=2)
