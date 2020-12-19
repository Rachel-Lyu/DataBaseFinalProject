package com.zhujunhui.backend.db;

public class ResultBean<T> {
    private int code;
    private String msg;
    private T data;

    public static ResultBean error(int code,String msg) {
        ResultBean bean = new ResultBean();
        bean.setCode(code);
        bean.setMsg(msg);
        return bean;
    }

    public ResultBean(){

    }

    public ResultBean(int code, String msg) {
        this.code= code;
        this.msg=msg;
    }


    public static ResultBean success(String msg) {
        ResultBean bean = new ResultBean();
        bean.setCode(0);
        bean.setMsg(msg);
        return bean;
    }

    public static ResultBean success() {
        ResultBean bean = new ResultBean();
        bean.setCode(0);
        bean.setMsg("成功");
        return bean;
    }

    public int getCode() {
        return code;
    }

    public String getMsg() {
        return msg;
    }

    public T getData() {
        return data;
    }

    public static <V> ResultBean<V> success(V data) {
        ResultBean bean = new ResultBean();
        bean.setCode(0);
        bean.setMsg("成功");
        bean.setData(data);
        return bean;
    }

    public void setCode(int code) {this.code=code;}

    public void setMsg(String msg) {this.msg=msg;}

    public void setData(T data) {this.data=data;}
}
