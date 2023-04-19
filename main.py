import pymysql
from app import app
from db_config import mysql
from flask import jsonify
from flask import flash, request,session, redirect, url_for


@app.route('/results', methods=['Get'])
def getBooks():
    searchTerm=request.args.get('q')
    if not searchTerm:
        message={
        'status': '400',
        'message': 'Search term is required.'
            }
        resp=jsonify(message)
        resp.status_code=500
        return resp
    
    url=f'https://www.googleapis.com/books/v1/volumes?q={searchTerm}'
    resp=request.get(url)
    results= resp.json()
    res= jsonify(results)

    if resp.status_code !=200:
        message={
            'message':'Could not retrieve book information.'
        }
        resp=jsonify(message)
        resp.status_code=500
        return resp
return res


#Return users Reviews from review tables when people search for a books. (post the book reviews)
@app.route('catalog/results/<str:title>', methods=['POST'])
def reviewsByTitle(title):
    try:
        conn=mysql.connect();
        curr=conn.cur(pymysql.cursors.DictCursors)

        cur.execute("SELECT * FROM review_details WHERE BookTitle = %s;",title)
        rows = cur.fetchall()
        if len(rows) > 0:
            resp = jsonify(rows)
            resp.status_code = 200
            return resp

        else:
            message = {
                'status': 414,
                'message': 'The user with the ID specified does NOT exist'
            }
            resp = jsonify(message)
            resp.status_code = 414
            return resp

        cur.close() #The finally block was removed and its content was placed here
        conn.close()

    except Exception as e: #(If there is an error, it will be returned in a JSON format)
        message = {
        'status': 500,
        'message': 'Error: '+str(e)
        }
        resp = jsonify(message)
        resp.status_code = 500
        return resp


@app.route('/user/account',methods = ['GET'])
def reviewsbyUser(id):
    try:
        conn=mysql.connect();
        curr=conn.cur(pymysql.cursors.DictCursors)

        cur.execute("SELECT * FROM review_details WHERE user_id = %s;",id)
        rows = cur.fetchall()
        if len(rows) > 0:
            resp = jsonify(rows)
            resp.status_code = 200
            return resp

        else:
            message = {
                'status': 414,
                'message': 'The user with the ID specified does NOT exist'
            }
            resp = jsonify(message)
            resp.status_code = 414
            return resp

        cur.close() #The finally block was removed and its content was placed here
        conn.close()

    except Exception as e: #(If there is an error, it will be returned in a JSON format)
        message = {
        'status': 500,
        'message': 'Error: '+str(e)
        }
        resp = jsonify(message)
        resp.status_code = 500
        return resp

    


#install flask-Session and mysql-connector-python
@app.route('/catalog/title',methods=['POST'])
def SubmitReview(id):
    try:
        if 'id' not in session:
            return redirect(url_for('login page.html'))

        BookTitle=request.form['title']
        Description=request.form['description']
        Rating= request.form['rating']

        conn = mysql.connect()
        cur = conn.cursor(pymysql.cursors.DictCursor)
        if title and description and rating:

            sql="INSERT INTO review_details (BookTitle, Description, Rating, user_id, id) VALUES(%s, %s, %s,%s,NULL)"
            data = (title, description, rating, id, NULL)
            message={
                'message':'Review has been submitted',
                'status':'200'
            }
            resp = jsonify(message)
            resp.status_code = 200
      
        else:
            message = {
                'status': 510,
                'message': 'Some of the fields are empty'
            }
            resp = jsonify(message)
            resp.status_code = 510

        cur.close() #The finally block was removed and its content was placed here
        conn.close()

        return resp 
        
    except Exception as e: #(If there is an error, it will be returned in a JSON format)
        message = {
        'status': 500,
        'message': 'Error: '+str(e)
        }
        resp = jsonify(message)
        resp.status_code = 500
        return resp




#Delete users reviews
@app.route('/user/delete/<str:title>/<int:id>')
def removeReview(BookTitle,id):
    try:
        #MySQL connection
        conn = mysql.connect()
        cur = conn.cursor(pymysql.cursors.DictCursor) #The function is actually cursor(), not cur()
        
        cur.execute("SELECT * FROM review_details WHERE user_id = %s;",id)
        rows = cur.fetchall()

        if len(rows) > 0:
            cur.execute("DELETE FROM review_details WHERE BookTitle = %s;",BookTitle)
            conn.commit()
            message = {
                'status': 200,
                'message': 'The review  of '+ BookTitle +' was deleted successfully'
            }
            resp = jsonify(message)
            resp.status_code = 414
            return resp

        else:
            message = {
                'status': 414,
                'message': 'The book does NOT exist'
            }
            resp = jsonify(message)
            resp.status_code = 414
            return resp

        cur.close() #The finally block was removed and its content was placed here
        conn.close()

    except Exception as e: #(If there is an error, it will be returned in a JSON format)
        message = {
        'status': 500,
        'message': 'Error: '+str(e)
        }
        resp = jsonify(message)
        resp.status_code = 500
        return resp


#update User Reviews
@app.route('/user/update',  methods=['POST'])
def updateReview(BookTitle,id):
    try:
        id = request.form['userId']
        BookTitle = request.form['booktitle']
        Desciption = request.form['email']
        Rating = request.form['rating']

        #MySQL connection
        conn = mysql.connect()
        cur = conn.cursor(pymysql.cursors.DictCursor)

        if BookTitle and Desciption and Rating and id:
            
            sql = "UPDATE review_details SET Desciption,Rating WHERE BookTitle = %s;"
            data = (BookTitle, Desciption, Rating, id)

            cur.execute(sql, data)
            conn.commit()

            message = {
                'status': 200,
                'message': 'The user was modified successfully'
            }
            resp = jsonify(message)
            resp.status_code = 200
        
        else:
            message = {
                'status': 510,
                'message': 'Some of the fields are empty'
            }
            resp = jsonify(message)
            resp.status_code = 510

        cur.close() #The finally block was removed and its content was placed here
        conn.close()

        return resp
    
    except Exception as e: #(If there is an error, it will be returned in a JSON format)
        message = {
        'status': 500,
        'message': 'Error: '+str(e)
        }
        resp = jsonify(message)
        resp.status_code = 500
        return resp


    

###################################################################################################################3

#Get records from a specific table in JSON format
@app.route('/users') #Changed the path to 'users'
def user():
    try:
        #MySQL connection
        conn = mysql.connect()
        cur = conn.cursor(pymysql.cursors.DictCursor) #The function is actually cursor(), not cur()
        
        cur.execute("SELECT * FROM account;")
        rows = cur.fetchall()
        print("Records returned: "+str(len(rows)))

        if len(rows) > 0:
            resp = jsonify(rows)
            resp.status_code = 200
            return resp

        else:
            message = {
                'status': 404,
                'message': 'The table is empty'
            }
            resp = jsonify(message)
            resp.status_code = 404
            return resp

        cur.close() #The finally block was removed and its content was placed here
        conn.close()

    except Exception as e: #(If there is an error, it will be returned in a JSON format)
        message = {
        'status': 500,
        'message': 'Error: '+str(e)
        }
        resp = jsonify(message)
        resp.status_code = 500
        return resp


@app.route('/users/<int:username>')
def view_user(id):
    try:
        #MySQL connection
        conn = mysql.connect()
        cur = conn.cursor(pymysql.cursors.DictCursor) #The function is actually cursor(), not cur()
        
        cur.execute("SELECT * FROM account WHERE username = %s;",username)
        rows = cur.fetchall()
        print("Records returned: "+str(len(rows)))

        if len(rows) > 0:
            resp = jsonify(rows)
            resp.status_code = 200
            return resp

        else:
            message = {
                'status': 414,
                'message': 'The user with the ID specified does NOT exist'
            }
            resp = jsonify(message)
            resp.status_code = 414
            return resp

        cur.close() #The finally block was removed and its content was placed here
        conn.close()

    except Exception as e: #(If there is an error, it will be returned in a JSON format)
        message = {
        'status': 500,
        'message': 'Error: '+str(e)
        }
        resp = jsonify(message)
        resp.status_code = 500
        return resp


#add account info into database 
@app.route('/users/create', methods=['POST'])
def add_user():
    try:
        username = request.form['username']
        email = request.form['email']
        firstname = request.form['firstname']
        lastname = request.form['lastname']
        password = request.form['password']

        #MySQL connection
        conn = mysql.connect()
        cur = conn.cursor(pymysql.cursors.DictCursor)

        if firstname and lastname and email and username and  password:

            sql = "INSERT INTO account (firstname, lastname, email, username, password) VALUES(%s, %s, %s, %s, %s)"
            data = (firstname, lastname, email, username, password)

            cur.execute(sql, data)
            conn.commit()

            message = {
                'status': 200,
                'message': 'The user was created successfully'
            }
            resp = jsonify(message)
            resp.status_code = 200
        
        else:
            message = {
                'status': 510,
                'message': 'Some of the fields are empty'
            }
            resp = jsonify(message)
            resp.status_code = 510

        cur.close() #The finally block was removed and its content was placed here
        conn.close()

        return resp
    
    except Exception as e: #(If there is an error, it will be returned in a JSON format)
        message = {
        'status': 500,
        'message': 'Error: '+str(e)
        }
        resp = jsonify(message)
        resp.status_code = 500
        return resp



#List records in a table using JavaScript+AJAX
#Custom search (using GET method)

@app.errorhandler(404)
def not_found(error = None):
    message = {
        'status': 404,
        'message': 'Not found: '+request.url
    }

    resp = jsonify(message)
    resp.status_code = 404

    return resp

if __name__ == "__main__":
    app.run()
