import pymysql
import bcrypt

db = pymysql.connect("localhost", "gtmetrix", "testpass", "gtmetrixdb")
cursor = db.cursor()
authenticated = False

def createUser():
	passhash = bcrypt.hashpw(b"pass", bcrypt.gensalt())
	print(passhash)
	insert = """INSERT INTO users (username, password) VALUES ('dave', '""" + passhash + """')"""
	cursor.execute(insert);
	db.commit()
	print("should be inserted");

def checkCredentials(name, password):
	query = """SELECT * FROM users WHERE username = '""" + name + """'""" 
	cursor.execute(query)
	user = cursor.fetchone()

	if user is None:
		print("invalid credentials.  Please try again.")
		return False

	hashedPassword = user[2]

	if bcrypt.hashpw(password, hashedPassword) == hashedPassword:
		print("Welcome " + name)
		global authenticated
		authenticated = True
	else:
		print("invalid credentials.  Please try again.")

def getLogin():
	username = input("Enter your username:  ")
	password = input("Enter your password:  ")
	checkCredentials(username, password)


# createUser()

# authenticated = False
while not(authenticated):
	getLogin()
