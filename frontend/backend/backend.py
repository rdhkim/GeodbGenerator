
# Import flask and datetime module for showing date and time
from flask import Flask
from azure.storage.blob import BlobServiceClient
import os
import pyodbc
import os
from dotenv import load_dotenv

load_dotenv()

# Initializing flask app
app = Flask(__name__)
  
@app.route('/get_photos')
def get_photos():
    account_name = 'geodbphoto'
    account_key= os.getenv(account_key)
    container_name = 'geophoto'

    connection_string = "DefaultEndpointsProtocol=https;AccountName=" + account_name + ";AccountKey=" +account_key+ ";EndpointSuffix=core.windows.net"
    blob_service_client = BlobServiceClient.from_connection_string(conn_str=connection_string)
    container_client = blob_service_client.get_container_client(container_name)

    blob_list = []
    for blob_i in container_client.list_blobs():
        blob_list.append(blob_i.name)
    return blob_list
    

@app.route('/get_db')
def get_db():
    rows = []
    #connect using parsed URL
    odbc_str = os.getenv('odbc_str')
    with pyodbc.connect(odbc_str) as conn:
        with conn.cursor() as cursor:
            cursor.execute("SELECT * from geodb")
            db_table = cursor.fetchall()
            for row in db_table:
                rows.append({
                    'id': row[0],
                    'address': row[1],
                    'district': row[2],
                    'signType': row[3],
                    'signTechnology': row[4],
                    'signSize': row[5],
                    'signStatus': row[6],
                    'signCondition': row[7],
                    'parcelId': row[8],
                    'parcelOwner': row[9],
                    'parcelOwnerAddress': row[10],
                    'businessName': row[11],
                    'renewalStatus': row[12],
                    'photo': row[13]
                })
                
            return rows

# Running app
if __name__ == '__main__':
    app.run(debug=True)