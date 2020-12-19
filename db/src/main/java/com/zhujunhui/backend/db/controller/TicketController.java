package com.zhujunhui.backend.db.controller;

import com.zhujunhui.backend.db.Dao.TicketDao;
import com.zhujunhui.backend.db.Dao.TicketDetail;
import com.zhujunhui.backend.db.Dao.TicketTypeDao;
import com.zhujunhui.backend.db.ResultBean;
import com.zhujunhui.backend.db.service.TicketService;
import com.zhujunhui.backend.db.service.TicketTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/ticket")
public class TicketController {

    @Autowired
    private TicketService ticketService;

    @Autowired
    private TicketTypeService ticketTypeService;

    @GetMapping("/all")
    public ResultBean<List<TicketDao>> getAll() {
        return ResultBean.success(ticketService.getAll());
    }

    @GetMapping("allTypes")
    public ResultBean<List<TicketTypeDao>> getAllTypes() {
        return ResultBean.success(ticketTypeService.getAllTypes());
    }

    @PostMapping("search")
    public ResultBean<List<TicketDao>> search(@RequestBody Map<String, String> map) throws ParseException {
//        return ResultBean.success(ticketService.search())
        System.out.println(map);
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String type = map.get("type");
        Date beginTime=sdf.parse(map.get("beginTime"));
        Date endTime=sdf.parse(map.get("endTime"));
        String keyword='%'+map.get("keyword")+'%';
        return ResultBean.success(ticketService.search(type,keyword,beginTime,endTime));
    }

    @GetMapping("getOne")
    public ResultBean<TicketDetail> getOne(@RequestParam int ticketId){
        return ResultBean.success(ticketService.getOne(ticketId));
    }
}
