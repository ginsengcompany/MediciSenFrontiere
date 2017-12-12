@echo off
echo Creazione backup database
pg_dump.exe --username "postgres" --file "E:\Progetti\MediciSenFrontiere\databaseBackup\mediciSenFrontiere.backup" "MediciSenFrontiere"
exit