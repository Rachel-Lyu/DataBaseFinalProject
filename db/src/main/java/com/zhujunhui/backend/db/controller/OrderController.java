package com.zhujunhui.backend.db.controller;

import com.zhujunhui.backend.db.Dao.OrderDao;
import com.zhujunhui.backend.db.ResultBean;
import com.zhujunhui.backend.db.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.xml.transform.Result;
import java.util.List;

@RestController
@RequestMapping("/order")
public class OrderController {

    @Autowired
    OrderService orderService;

    @GetMapping("selfOrder")
    public ResultBean<List<OrderDao>> getSelfOrders(@RequestParam String userId){
        return ResultBean.success(orderService.getSelfOrders(userId));
    }

    @GetMapping("/createOrder")
    public ResultBean createOrder(@RequestParam String userId,@RequestParam int ticketId) {
        if(orderService.createOrder(userId, ticketId)!=0)
            return ResultBean.error(3,"售完了！");
        return ResultBean.success("购买成功！");
    }

    @GetMapping("/deleteOrder")
    public ResultBean deleteOrder(@RequestParam int orderId) {
        if(orderService.deleteOrder(orderId)!=0)
            return ResultBean.error(3,"不存在该订单！");
        return ResultBean.success("退订成功！");
    }
}
