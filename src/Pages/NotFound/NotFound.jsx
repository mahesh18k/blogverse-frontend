import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import NavigationBar from '../../Components/NavigationBar';
import './NotFound.css';

const lottieAnimationUrl = 'https://assets10.lottiefiles.com/packages/lf20_UJNc2t.json';

function NotFound() {
    const [animationData, setAnimationData] = useState(null);

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        fetch(lottieAnimationUrl, { signal: controller.signal })
            .then((res) => res.json())
            .then((json) => {
                if (isMounted) setAnimationData(json);
            })
            .catch(() => {
                // Ignore errors; the page still works without the animation
            });

        return () => {
            isMounted = false;
            controller.abort();
        };
    }, []);

    return (
        <>
            <NavigationBar />
            <div className="notfound-wrapper">
                <div className="bg-gradient" />
                <div className="blob blob-1" />
                <div className="blob blob-2" />
                <div className="blob blob-3" />

                <motion.div
                    className="glass-card"
                    initial={{ opacity: 0, y: 30, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                >
                    <motion.h1
                        className="heading-404"
                        initial={{ letterSpacing: '-0.1em' }}
                        animate={{ letterSpacing: '0.02em' }}
                        transition={{ duration: 1.2 }}
                    >
                        4<span className="glow">0</span>4
                    </motion.h1>

                    <motion.p
                        className="subtitle"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                    >
                        The page you're looking for has drifted into the void.
                    </motion.p>

                    {animationData && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.6 }}
                            className="lottie-box"
                        >
                            <Lottie
                                animationData={animationData}
                                loop
                                autoplay
                                style={{ height: 260 }}
                            />
                        </motion.div>
                    )}

                    <motion.div
                        className="cta-group"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                    >
                        <Button href="/" variant="primary" className="cta-btn">Go Home</Button>
                        <Button href="/blog" variant="outline-light" className="cta-btn alt">Browse Blogs</Button>
                    </motion.div>
                </motion.div>
            </div>
        </>
    );
}

export default NotFound;


