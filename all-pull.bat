@ECHO OFF
ECHO --------------------------------------------------
FOR /d %%d IN (*) DO (
    ECHO [%%d]
    CD %%d && git checkout main && git pull
    CD ..
    ECHO --------------------------------------------------
)

TIMEOUT 5
