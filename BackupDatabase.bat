::unità di pianificazione per il backup automatico
::prima di eseguire il batch creare la variabile d'ambiente PGPASSWORD con valore C:\Users\Antonio Biondillo\AppData\Roaming\postgresql\pgpass.conf , creare file pgpass.conf con dentro : hostname:port:database:username:password
 runas /user:Administrator
 @echo off
   for /f "tokens=1-4 delims=/ " %%i in ("%date%") do (
     set dow=%%i
     set month=%%j
     set day=%%k
     set year=%%l
   )
   set datestr=%month%_%day%_%year%
   echo datestr is %datestr%
    
   set BACKUP_FILE=BackupSurgeryForChildren_%datestr%.backup
   echo backup file name is %BACKUP_FILE%
   SET PGPASSWORD=postgres
   echo on
   cd C:\Program Files\PostgreSQL\9.3\bin
   pg_dump -i -h localhost -p 5432 -U postgres -F c -b -v -f C:\MediciSenFrontiere\databaseBackup\%BACKUP_FILE% MediciSenFrontiere