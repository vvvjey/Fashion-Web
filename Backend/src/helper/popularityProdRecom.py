import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

# Replace with the path to your CSV file
csv_path = './src/helper/product_ratings_adjusted.csv'

# Read the CSV file
df = pd.read_csv(csv_path, encoding='unicode_escape')
no_of_rated_products_per_user = df.groupby(by='product_id')['starRate'].count().sort_values(ascending=False)
# print(no_of_rated_products_per_user.head())
top_5_product_ids = no_of_rated_products_per_user.head(5).index.tolist()
import json
top_5_product_ids_json = json.dumps(top_5_product_ids)

print(top_5_product_ids_json)
