USE DBmain;

DELIMITER $$
CREATE PROCEDURE login_usuario ( senhaIn VARCHAR(100), loginIn VARCHAR(20) )
BEGIN
	IF EXISTS (SELECT id, nome FROM usuarios WHERE senha = senhaIn AND login = loginIn) THEN
		SELECT id, nome FROM usuarios WHERE senha = senhaIn AND login = loginIn;
	END IF;
END $$
DELIMITER ;