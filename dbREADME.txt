
----------------------------------------------------------------
CREATE (INSERT)
----------------------------------------------------------------
usage: create(type, param[])
- type:
	user
	issue
	comment

- param:
	
	USER:
	param[] = {name, email, password, neighborhood, 
		postalCode}

	ISSUE:
	param[] = {userID, status, title, description, link,
		location}
	** date(timestamp) is automatically handled

	COMMENT:
	param[] = {userID, issueID, content}
	** date(timestamp) is automatically handled

----------------------------------------------------------------
