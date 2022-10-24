# K6---postgress-CC

# Postgresql

## Install on windows

Download the installer from https://www.postgresql.org/

It's important to download database drivers on skill builder. Select them all

Then it will install Npsql

*After installation, you will find psqsl console in PostgreSQL 15 folder*

## Configure postgresql

When you open the console, you will see a prompt where you can define fiels or use default values (*If you want to use default values, just press enter*):

```
    Server [localhost]:
    Database [postgres]:
    Port [5432]:
    Username [postgres]:
    Contraseña para usuario postgres:
    psql (15.0)
    ADVERTENCIA: El código de página de la consola (850) difiere del código
                de página de Windows (1252).
                Los caracteres de 8 bits pueden funcionar incorrectamente.
                Vea la página de referencia de psql «Notes for Windows users»
                para obtener más detalles.
    Digite «help» para obtener ayuda.

    postgres=#
```

Now you can open pgAdmin, you can find it in the same folder where you installed postgresql *PostgreSQL 15*

You'll find something like this:

![postgres admin panel](/images/postgres.PNG "postgres admin panel").

## Configure postgres on django

You have to install psycopg2, you can do it with pip:

```
    pip install psycopg2
```

Create server on pgAdmin, you can find it in the left side of the window, right click on servers and select create server

![create server](/images/createserver.gif "create server")

Then you can add a database, right click on the server you just created and select create database

![create database](/images/createserver2.gif "create database")

In settings.py, you will find a DATABASES variable, you can configure it like this:

```
    DATABASES = {
        'default': {
            # posttgress db
            'ENGINE': 'django.db.backends.postgresql_psycopg2',
            'NAME': 'my_db',
            'USER': 'postgres',
            'PASSWORD': 'nacional',
            'HOST': '127.0.0.1',
            'PORT': '5432',
        }
    }
```


# K6

## Install on windows

First install chocolatey, you can do it with powershell with permissions as administrator

```
    Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
```

Then you can install k6 with chocolatey

```
    choco install k6
```

## Run tests

After you created your test, you can run it with k6 (**In Powershell** *If you´re using Windows*)

```
    k6 run <path to your test>
    ie:

    k6 run script.js
```

- Run with 10 virtual users for 30 seconds:

```
    k6 run -u 10 -d 30s script.js
```

`Note: Instead of typing --vus 10 and --duration 30s each time you run the script, you can include the options in your JavaScript file:`

```
    script.js
    import http from 'k6/http';
    import { sleep } from 'k6';
    export const options = {
    vus: 10,
    duration: '30s',
    };
    export default function () {
    http.get('http://test.k6.io');
    sleep(1);
    }
```

## See summary

To see a summary of the test, you can run add the following code at the end of your test:

```
    import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
    import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";

    export function handleSummary(data) {
        return {
            "result.html": htmlReport(data),
            stdout: textSummary(data, { indent: " ", enableColors: true }),
        };
    }
```

## See metrics and graphs

We can set up our k6 to send results to the cloud, so we can see metrics and graphs

Follow this steps: **https://notes.nicolevanderhoeven.com/Running+on+k6+Cloud+from+CLI**

- Login with token

```
    k6 login cloud --token <YOURTOKEN>
```

When you run your test, you can add the following code at the end of your test:

```
    k6 run test.js -o cloud
```