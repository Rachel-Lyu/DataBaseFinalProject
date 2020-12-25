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

//    @GetMapping("allTypes")
//    public ResultBean<List<TicketTypeDao>> getAllTypes() {
//        return ResultBean.success(ticketTypeService.getAllTypes());
//    }

    @GetMapping("allTypes")
    public ResultBean<List<TicketTypeDao>> getAllFatherTypes() {
        return ResultBean.success(ticketTypeService.getAllFatherTypes());
    }

    @PostMapping("sonTypes")
    public ResultBean<List<TicketTypeDao>> getSonTypesOf(@RequestBody Map<String, String> map) throws ParseException {
        System.out.println(map);
        String parentType = map.get("fType");
//        System.out.println(parentType);
        return ResultBean.success(ticketTypeService.getAllSonsOf(parentType));
    }

    @PostMapping("search")
    public ResultBean<List<TicketDao>> search(@RequestBody Map<String, String> map) throws ParseException {
//        return ResultBean.success(ticketService.search())
//        System.out.println(map);
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        boolean isFartherType = true;
        String type = map.get("type");
        if (type != null && type.equals("全部")) type = null;
        if (map.get("sonType") != null && !map.get("sonType").equals("全部")) {
            type = map.get("sonType");
            isFartherType = false;
        }

        String city = map.get("city");
        if (city != null && city.equals("全部")) city = null;

        Date beginTime = null;
        if (map.get("beginTime") != null)
            beginTime = sdf.parse(map.get("beginTime"));

        Date endTime = null;
        if (map.get("endTime") != null)
            endTime = sdf.parse(map.get("endTime"));

        String keyword = '%' + map.get("keyword") + '%';
//        if (type != null)
        System.out.println(keyword);
        return ResultBean.success(ticketService.search(isFartherType, type, keyword, beginTime, endTime, city));
    }

    @GetMapping("getOne")
    public ResultBean<TicketDetail> getOne(@RequestParam int ticketId) {
        return ResultBean.success(ticketService.getOne(ticketId));
    }
}
