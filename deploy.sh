#!/usr/bin/env bash

#Просмотр логов: pm2 logs danshin_gen_front

echo "Удали процесс: pm2 delete danshin_gen_front на сервере? y/n (pm2 ls список процессов). Сделал? y/n"
read answer

if [ $answer == "y" ]; then
    rm -rf storage/logs/app.log
    
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

    echo "Выполни на удалённом сервере команды! Перейди в каталог cd /var/www/danshin_gen/front. Сделал? y/n"
    read answer1
    if [ $answer1 == "y" ]; then
        echo "Выполни npm install. Сделал? y/n"
        read answer2
        if [ $answer2 == "y" ]; then
            echo "Выполни npm run build. Сделал? y/n"
            read answer3
            if [ $answer3 == "y" ]; then
                echo "Выполни pm2 start npm --name danshin_gen_front -- start, сохрани процесс pm2 save, и найди его в списке pm2 ls."
                echo "Успешно завершено!"
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

