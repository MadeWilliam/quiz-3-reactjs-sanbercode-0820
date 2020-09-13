import React from 'react';

const About = () => {
    return (
        <div>
            <main class="container">
                <h1 class="centered">Data Peserta Sanbercode Bootcamp Reactjs</h1>
                <ol>
                    <li>
                        <span class="bold">Nama: </span> Made William Mahardika
                    </li>
                    <li>
                        <span class="bold">Email: </span> pupul.study@gmail.com
                    </li>
                    <li>
                        <span class="bold">Sistem Operasi yang digunakan: </span> Windows
                    </li>
                    <li>
                        <span class="bold">Akun Gitlab: </span> @pupul.study
                    </li>
                    <li>
                        <span class="bold">Akun Telegram: </span> Made William
                    </li>
                </ol>
                <a href="/">Kembali Ke Index</a>
            </main>
        </div>
    );
}

export default About;