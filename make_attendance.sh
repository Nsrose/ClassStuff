## Creates a new attendance web app. 

app_name="$1"
if [ ! -d "$app_name" ]; then
    cp -r AttendanceAppTemplate $app_name
    python create_attendance.py $app_name
    echo Attendance app $app_name created.
else
    echo Error: application $app_name already exists.
fi

    