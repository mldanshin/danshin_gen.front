#!/usr/bin/env bash

#Останови и удали процесс на сервере перед обновлением
#pm2 ls список процессов
#pm2 delete gen-front-danshin

echo "Ты остановил и удалил процесс: pm2 delete gen-front-danshin на сервере? y/n (pm2 ls список процессов)"
read answer

if [ $answer == "y" ]; then
    rm -rf ../gen-front
    cp -a ../front ../gen-front

    cd ../gen-front
    rm -rf node_modules
    rm -rf package-lock.json

    rm .env
    cp .env.production .env
    rm .env.production

    cd ../

    tar -cf gen-front.tar gen-front
    scp gen-front.tar root@5.35.93.48:/var/www
    ssh root@5.35.93.48 mkdir /var/www/danshin_gen
    ssh root@5.35.93.48 rm -r /var/www/danshin_gen/front
    ssh root@5.35.93.48 tar -C /var/www -xvf /var/www/gen-front.tar
    ssh root@5.35.93.48 rm -rf /var/www/gen-front.tar
    ssh root@5.35.93.48 mv /var/www/gen-front /var/www/danshin_gen/front

    rm -rf gen-front.tar
    rm -rf gen-front

    echo "Выполни на удалённом сервере команды! Перейди в каталог cd /var/www/danshin_gen/front. Далее next"
    read answer1
    if [ $answer1 == "next" ]; then
        echo "Выполни npm install. Далее next"
        read answer2
        if [ $answer2 == "next" ]; then
            echo "Выполни npm run build. Далее next"
            read answer3
            if [ $answer3 == "next" ]; then
                echo "Выполни pm2 start npm --name gen-front-danshin -- start, сохрани процесс pm2 save, и найди его в списке pm2 ls"
                echo "files \"danshin_gen front\" compiled successfully"
            else
                echo "Меня надо было слушать. Ты банкрот."
            fi
        else
            echo "Меня надо было слушать. Ты банкрот."
        fi
    else
        echo "Меня надо было слушать. Ты банкрот."
    fi
else
    echo "Останови и удали, а потом приходи"
fi

#Затем в каталоге проекта на сервере (/var/www/danshin_gen/front)
#выполнить npm install
#выполнить npm run build

#Запустить вместо npm start в менеджере: pm2 start npm --name gen-front-danshin -- start
#Сохранить процесс: pm2 save
#pm2 ls список процессов
