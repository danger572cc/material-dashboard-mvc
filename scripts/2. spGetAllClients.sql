CREATE OR ALTER   PROCEDURE dbo.GetAllClients (@page int, @size int)
AS
BEGIN
SELECT  * FROM dbo.Clients c
ORDER BY c.Id ASC
OFFSET(@page - 1) * @size ROWS
FETCH NEXT @size ROWS ONLY;
END