import React from 'react';

const About = () => {
    return (
        <div>
            <section>
                <h1 className="centered">Data Peserta Sanbercode Bootcamp Reactjs</h1>
                <ol>
                    <li>
                        <span className="bold">Nama: </span> Made William Mahardika
                    </li>
                    <li>
                        <span className="bold">Email: </span> pupul.study@gmail.com
                    </li>
                    <li>
                        <span className="bold">Sistem Operasi yang digunakan: </span> Windows
                    </li>
                    <li>
                        <span className="bold">Akun Gitlab: </span> @pupul.study
                    </li>
                    <li>
                        <span className="bold">Akun Telegram: </span> Made William
                    </li>
                </ol>
                <a href="/" style={{textAlign: "right"}}>Kembali Ke Index</a>
            </section>
        </div>
    );
}

export default About;