import csv
import mysql.connector

conn = mysql.connector.connect(
    host="43.200.255.205",
    user="unni",
    password="xmrghka302",
    database="toonbti",
    port="3333"
)

cursor = conn.cursor()

list = []

with open('transformed_userwebtoon.csv', 'r') as csvfile:
    reader = csv.reader(csvfile)
    data = [row for row in reader]

for row in data:
    title = row[1];
    sql = "SELECT webtoon_id FROM webtoon WHERE search_title like (%s) LIMIT 1"
    val = ('%'+title+'%',)
    cursor.execute(sql, val)
    result = cursor.fetchone()

    if not result:
        continue
    list.append([int(row[0]),result[0]])

for row in list:
    print(row[1], row[0]+1602)
    # INSERTxecu 쿼리 실행
    sql = "INSERT INTO userwebtoon (webtoon_id, user_id) VALUES (%s, %s)"
    val = (row[1], row[0]+1602)
    cursor.execute(sql, val)
    conn.commit()
# with open('webtoon_tag_result.csv', encoding='utf-8') as f:
#     reader = csv.reader(f)
#     next(reader)  # 헤더 건너뛰기
#     for row in reader:
#         webtoon_id, tag_id = row
#         # INSERT 쿼리 실행
#         sql = "INSERT INTO webtoonTag (webtoon_id, tag_id) VALUES (%s, %s)"
#         val = (webtoon_id, tag_id)
#         cursor.execute(sql, val)
#         conn.commit()
conn.close()