package protocol;

import com.google.gson.annotations.SerializedName;

/**
 * 
 * @author ppetrov
 * 
 * JSON Protocol Packet
 */
public class Packet {
	
	@SerializedName("type")
	private int type;
	@SerializedName("who")
	private String nickname;
	@SerializedName("msg")
	private String message;

	public int getType() {
		return type;
	}
	public void setType(int type) {
		this.type = type;
	}
	public String getNickname() {
		return nickname;
	}
	public void setNickname(String nickname) {
		this.nickname = nickname;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	
	public String toEchoMessage() {
		return String.format("[%s] %s", this.nickname, this.message);
	}
	
	@Override
	public String toString() {
		return String.format("Packet [%d] from %s", this.type, this.nickname);
	}
	
}
